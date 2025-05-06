import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "../../services/apiClient";
import { AxiosErrorWithMessage } from "../../services/errorMessage";
import { queryClient } from "../../services/queryClient";

const fetchCreateGenre = async (title: string) => {
  const { data } = await api.post(`/genres`, {
    title,
  });

  return data;
};

export const useCreateGenre = () => {
  return useMutation({
    mutationFn: fetchCreateGenre,
    onSuccess: () => {

      queryClient.invalidateQueries({ queryKey: ['list-genres'] });

      toast.success("Gênero criado com sucesso");
    },
    onError: (error: AxiosErrorWithMessage) => {
      toast.error(error.response.data.message);
    },
  });
};
