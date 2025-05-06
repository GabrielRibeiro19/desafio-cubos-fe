import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "../../services/apiClient";
import { AxiosErrorWithMessage } from "../../services/errorMessage";
import { ICreateUser } from "../../types/user";

const fetchCreateUser = async (params: ICreateUser) => {
  const { data } = await api.post(`/users`, {
    ...params,
  });

  return data;
};

export const useCreateUser = () => {
  return useMutation({
    mutationFn: fetchCreateUser,
    onSuccess: () => {
      toast.success("Usuário criado com sucesso");
    },
    onError: (error: AxiosErrorWithMessage) => {
      toast.error(error.response.data.message);
    },
  });
};
