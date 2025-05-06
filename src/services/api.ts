import axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "../errors/AuthTokenError";

interface AxiosErrorResponse {
  message?: string;
}

type FailedRequestQueue = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

const failedRequestsQueue = Array<FailedRequestQueue>();

// Verificação de ambiente navegador
const isBrowser = typeof window !== "undefined";

export function setupAPIClient() {
  const cookies = parseCookies();
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL, // Corrigido: use VITE_API_URL em vez de BASE_URL
    headers: {
      Authorization: `Bearer ${cookies["desafiocubos.token"]}`,
    },
  });

  api.interceptors.request.use((config) => {
    const cookies = parseCookies(); // Atualiza o cookie em cada requisição
    config.headers.Authorization = `Bearer ${cookies["desafiocubos.token"]}`;
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError<AxiosErrorResponse>) => {
      if (error.response?.status === 401) {
        if (error.response.data?.message === "Token inválido") {
          const originalConfig = error.config;

          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({
              onSuccess: (token: string) => {
                if (!originalConfig?.headers) {
                  return reject(new Error("Headers configuration not found"));
                }

                originalConfig.headers.Authorization = `Bearer ${token}`;
                resolve(api(originalConfig));
              },
              onFailure: (err: AxiosError) => {
                reject(err);
              },
            });
          });
        } else {
          axios.defaults.headers.common.Authorization = false;
          destroyCookie(null, "desafiocubos.data", {
            path: "/",
          });
          destroyCookie(null, "desafiocubos.token", {
            path: "/",
          });

          // Verificando se estamos no navegador
          if (isBrowser) {
            // Código executado apenas no navegador
            destroyCookie(null, "desafiocubos.data", {
              path: "/",
            });
            destroyCookie(null, "desafiocubos.token", {
              path: "/",
            });
          } else {
            // Código executado no servidor
            return Promise.reject(new AuthTokenError());
          }
        }
      }

      return Promise.reject(error);
    },
  );

  return api;
}
