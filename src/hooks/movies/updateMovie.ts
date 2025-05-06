import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '../../services/apiClient';
import { queryClient } from '../../services/queryClient';

const fetchUpdateMovie = async (formData: FormData) => {
  const movieId = formData.get('id');

  const { data } = await api.put(`/movies/${movieId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const useUpdateMovie = () => {
  return useMutation({
    mutationFn: fetchUpdateMovie,
    onSuccess: () => {
      toast.success('Filme atualizado com sucesso');

      queryClient.invalidateQueries({
        queryKey: ['get-movie'],
      });

      queryClient.invalidateQueries({
        queryKey: ['list-movies'],
      });
    },
    onError: () => {
      toast.error('Erro ao atualizar filme');
    },
  });
};