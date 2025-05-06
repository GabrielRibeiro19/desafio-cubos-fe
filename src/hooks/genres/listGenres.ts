import { useQuery } from "@tanstack/react-query";
import { api } from "../../services/apiClient";
import { IGenre } from "../../types/genre";

const fetchListGenres = async (): Promise<IGenre[]> => {
  const { data } = await api.get<IGenre[]>("/genres");

  return data;
};

export const useListGenres = () => {
  return useQuery({
    queryKey: ['list-genres'],
    queryFn: fetchListGenres,
  });
};
