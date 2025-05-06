import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "../../services/apiClient";
import { AxiosErrorWithMessage } from "../../services/errorMessage";
import { queryClient } from "../../services/queryClient";

const fetchDeleteMovie = async (id: string) => {
  const { data } = await api.delete(`/movies/${id}`);
  return data;
};

export const useDeleteMovie = () => {
  return useMutation({
    mutationFn: fetchDeleteMovie,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["list-movies"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-movie"],
      });

      toast.success("Filme deletado com sucesso");
    },
    onError: (error: AxiosErrorWithMessage) => {
      toast.error(error?.response.data.message || 'Erro ao deletar filme');
    },
  });
};
