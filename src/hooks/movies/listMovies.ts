// src/hooks/movies/listMovies.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '../../services/apiClient';
import { IListMoviesOptions, IResponseListMovies } from '../../types/movie';

const fetchListMovies = async (options: IListMoviesOptions = {}): Promise<IResponseListMovies> => {
  const {
    page = 1,
    per_page = 10,
    q,
    genre_ids,
    duration_range,  // Atualizado para duration_range
    start_release_at,
    end_release_at,
  } = options;

  const params = new URLSearchParams();

  params.append('page', String(page));
  params.append('per_page', String(per_page));

  if (q) params.append('q', q);
  // Utilizar o duration_range em vez de duration
  if (duration_range) params.append('duration_range', duration_range);
  if (start_release_at) params.append('start_release_at', start_release_at);
  if (end_release_at) params.append('end_release_at', end_release_at);

  // Adicionar cada genre_id como um parâmetro separado
  if (genre_ids && genre_ids.length > 0) {
    genre_ids.forEach(id => {
      params.append('genre_ids', id);
    });
  }

  const { data } = await api.get<IResponseListMovies>(`/movies?${params.toString()}`);

  return data;
};

export function useListMovies(options: IListMoviesOptions = {}) {
  return useQuery({
    queryKey: ['list-movies', options],
    queryFn: () => fetchListMovies(options),
  });
}