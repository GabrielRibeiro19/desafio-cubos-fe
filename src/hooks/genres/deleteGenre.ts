import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { api } from "../../services/apiClient";
import { queryClient } from "../../services/queryClient";

const fetchDeleteGenre = async (id: string) => {
  const { data } = await api.delete(`/genres/${id}`);
  return data;
};

export const useDeleteGenre = () => {
  return useMutation({
    mutationFn: fetchDeleteGenre,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["list-genres"],
      });

      queryClient.invalidateQueries({
        queryKey: ["list-movies"],
      });

      queryClient.invalidateQueries({
        queryKey: ["get-movie"],
      });

      toast.success("Gênero deletado com sucesso");
    },
    onError: () => {
      toast.error("Erro ao deletar gênero");
    },
  });
};
