import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { api } from "../services/apiClient";
import {
  AuthContextData,
  AuthProviderProps,
  SignInCredentials,
  User,
} from "./types";

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>();
  const [authChecked, setAuthChecked] = useState(false); // Novo estado

  const isAuthenticated = !!user;

  useEffect(() => {
    try {
      authChannel = new BroadcastChannel("auth");

      authChannel.onmessage = (message) => {
        switch (message.data) {
          case "signOut":
            navigate("/");
            authChannel.close();
            break;
          default:
            authChannel.close();
            break;
        }
      };

      return () => {
        // Limpar o canal ao desmontar
        authChannel?.close();
      };
    } catch (error) {
      // Fallback para navegadores que não suportam BroadcastChannel
      console.error("BroadcastChannel not supported", error);
    }
  }, [navigate, isAuthenticated]);

  useEffect(() => {
    const { "desafiocubos.data": data } = parseCookies();

    if (data) {
      try {
        const { user } = JSON.parse(data);
        setUser({ name: user.name, email: user.email });
      } catch (error) {
        console.error("Error parsing user data", error);
        destroyCookie(null, "desafiocubos.data", { path: "/" });
      }
    }

    setAuthChecked(true);
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      const { token, user, refresh_token } = response.data;

      setCookie(null, "desafiocubos.data", JSON.stringify(response.data), {
        maxAge: 60 * 60 * 24, // 1 dia
        path: "/",
      });

      setCookie(null, "desafiocubos.token", token, {
        maxAge: 60 * 60 * 24, // 1 dia
        path: "/",
      });

      setCookie(undefined, "desafiocubos.refresh_token", refresh_token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });

      api.defaults.headers.Authorization = `Bearer ${token}`;

      setUser({
        name: user.name,
        email: user.email,
      });

      if (parseCookies()["desafiocubos.token"]) {
        toast.success("Login efetuado");
        navigate("/movies");
      }

      return true;
    } catch (err: unknown) {
      toast.error("Usuário ou senha inválidos");
      console.error(err);
      return false;
    }
  }

  function signOut() {
    destroyCookie(null, "desafiocubos.data", {
      path: "/",
    });

    destroyCookie(null, "desafiocubos.token", {
      path: "/",
    });

    destroyCookie(null, "desafiocubos.refresh_token", {
      path: "/",
    });

    toast.success("Você saiu da sua conta!");

    try {
      authChannel?.postMessage("signOut");
    } catch (error) {
      console.error("Error posting to broadcast channel", error);
    }

    setUser(undefined);
    navigate("/");
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, isAuthenticated, user, setUser, authChecked }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
