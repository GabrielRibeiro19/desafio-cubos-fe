import axios, { AxiosError } from "axios";
import { destroyCookie, parseCookies, setCookie } from "nookies";
import { AuthTokenError } from "../errors/AuthTokenError";

interface AxiosErrorResponse {
  message?: string;
}

type FailedRequestQueue = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

let isRefreshing = false;
const failedRequestsQueue: FailedRequestQueue[] = [];

// Verificação de ambiente navegador
const isBrowser = typeof window !== "undefined";

export function setupAPIClient(ctx = undefined) {
  const cookies = parseCookies(ctx);
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      Authorization: `Bearer ${cookies["desafiocubos.token"]}`,
    },
  });

  api.interceptors.request.use((config) => {
    const cookies = parseCookies(ctx); // Atualiza o cookie em cada requisição
    config.headers.Authorization = `Bearer ${cookies["desafiocubos.token"]}`;
    return config;
  });

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error: AxiosError<AxiosErrorResponse>) => {
      if (error.response?.status === 401) {
        if (error.response.data?.message === "Token Inválido") {

          const originalConfig = error.config;

          // Verificar se não está no processo de refresh
          if (!isRefreshing) {
            isRefreshing = true;

            try {
              const { "desafiocubos.refresh_token": refreshToken } = parseCookies(ctx);

              // Fazer requisição para renovar o token
              const response = await api.post('/refresh-token', {
                refreshToken
              });

              const { token, refresh_token } = response.data;

              // Salvar os novos tokens nos cookies
              setCookie(ctx, "desafiocubos.token", token, {
                maxAge: 60 * 60 * 24, // 1 dia
                path: "/",
              });

              setCookie(ctx, "desafiocubos.refresh_token", refresh_token, {
                maxAge: 60 * 60 * 24 * 30, // 30 dias
                path: "/",
              });

              // Atualizar o header de Authorization para as próximas requisições
              api.defaults.headers.Authorization = `Bearer ${token}`;

              // Processar a fila de requisições que falharam
              failedRequestsQueue.forEach(request => {
                request.onSuccess(token);
              });

              // Limpar a fila
              failedRequestsQueue.splice(0, failedRequestsQueue.length);

            } catch (err) {
              // Se falhar o refresh, processa a fila com erro
              failedRequestsQueue.forEach(request => {
                request.onFailure(err as AxiosError);
              });

              // Limpar a fila
              failedRequestsQueue.splice(0, failedRequestsQueue.length);

              // Se estiver no navegador, fazer logout
              if (isBrowser) {
                // Limpar cookies e redirecionar para login
                destroyCookie(null, "desafiocubos.data", { path: "/" });
                destroyCookie(null, "desafiocubos.token", { path: "/" });
                destroyCookie(null, "desafiocubos.refresh_token", { path: "/" });

                // Redirecionar para login (isso será tratado pelo AuthContext)
                window.location.href = "/";
              }
            } finally {
              isRefreshing = false;
            }
          }

          // Retornar uma nova Promise para as requisições que falharam enquanto o token estava sendo renovado
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
          // Para outros erros 401, fazer logout
          if (isBrowser) {
            // Limpar cookies
            destroyCookie(null, "desafiocubos.data", { path: "/" });
            destroyCookie(null, "desafiocubos.token", { path: "/" });
            destroyCookie(null, "desafiocubos.refresh_token", { path: "/" });

            // Redirecionar para login
            window.location.href = "/";
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}
