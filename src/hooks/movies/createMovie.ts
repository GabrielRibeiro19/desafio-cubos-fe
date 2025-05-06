import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { api } from '../../services/apiClient';
import { AxiosErrorWithMessage } from '../../services/errorMessage';
import { queryClient } from '../../services/queryClient';
import { ICreateMovie } from '../../types/movie';

const fetchCreateMovie = async (params: ICreateMovie) => {
  const formData = new FormData();

  // Adicionar campos básicos
  formData.append('title', params.title);
  formData.append('original_title', params.original_title);
  if (params.tagline) {
    formData.append('tagline', params.tagline);
  }
  formData.append('overview', params.overview);
  formData.append('trailer_url', params.trailer_url);
  formData.append('popularity', String(params.popularity));
  formData.append('votes', String(params.votes));
  formData.append('rating', String(params.rating));
  formData.append('release_date', params.release_date);
  formData.append('status', params.status);
  formData.append('language', params.language);
  formData.append('budget', String(params.budget));
  formData.append('revenue', String(params.revenue));
  formData.append('profit', String(params.profit));
  formData.append('duration', params.duration.toString());

  // Adicionar imagens
  formData.append('image', params.image);
  if (params.image_secondary) {
    formData.append('image_secondary', params.image_secondary);
  }

  // Adicionar gêneros (se existirem)
  if (params.genre_ids && params.genre_ids.length > 0) {
    params.genre_ids.forEach(genreId => {
      formData.append('genre_ids', genreId);
    });
  }

  const { data } = await api.post('/movies', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const useCreateMovie = () => {
  return useMutation({
    mutationFn: fetchCreateMovie,
    onSuccess: () => {
      toast.success('Filme criado com sucesso');

      queryClient.invalidateQueries({
        queryKey: ['list-movies'],
      });
    },
    onError: (error: AxiosErrorWithMessage) => {
      toast.error(error?.response.data.message || 'Erro ao criar filme');
    },
  });
};
