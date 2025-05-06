'use client'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../services/apiClient'
import { IResponseMovie } from '../../types/movie'

const fetchGetMovie = async (id: string): Promise<IResponseMovie> => {
  const { data } = await api.get<IResponseMovie>(`/movies/${id}`)

  return data
}

export const useGetMovie = (id: string) => {
  return useQuery({
    queryKey: ['get-movie', id],
    queryFn: () => fetchGetMovie(id),
  })
}
