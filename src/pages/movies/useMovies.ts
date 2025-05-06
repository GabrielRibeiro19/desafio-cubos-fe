import { useEffect, useState } from 'react';
import { useListMovies } from '../../hooks/movies/listMovies';
import { IResponseMovie } from '../../types/movie';

interface FiltersState {
  search: string;
  page: number;
  perPage: number;
  genreIds: string[];
  duration_range: "less_than_1h" | "between_1h_and_2h" | "more_than_2h" | "";  // Atualizado
  startReleaseAt: string;
  endReleaseAt: string;
}

export function useMovies() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [movies, setMovies] = useState<IResponseMovie[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState<FiltersState>({
    search: "",
    page: 1,
    perPage: 10,
    genreIds: [],
    duration_range: "",  // Atualizado
    startReleaseAt: "",
    endReleaseAt: "",
  });

  // Requisição de listagem de filmes
  const { data, isLoading } = useListMovies({
    page: filters.page,
    per_page: filters.perPage,
    q: filters.search || undefined,
    genre_ids: filters.genreIds.length > 0 ? filters.genreIds : undefined,
    duration_range: filters.duration_range || undefined,  // Atualizado
    start_release_at: filters.startReleaseAt || undefined,
    end_release_at: filters.endReleaseAt || undefined,
  });

  // Atualiza os filmes quando os dados da API mudam
  useEffect(() => {
    if (data) {
      setMovies(data.data);
      setTotalPages(data.last_page);
    }
  }, [data]);

  // Funções para manipular os filtros
  const handleSearch = (searchTerm: string) => {
    setFilters(prev => ({ ...prev, search: searchTerm, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const handleOpenFilterModal = () => {
    setIsFilterModalOpen(true);
  };

  const handleCloseFilterModal = () => {
    setIsFilterModalOpen(false);
  };

  const handleApplyFilters = (newFilters: {
    genreIds: string[];
    duration_range: "less_than_1h" | "between_1h_and_2h" | "more_than_2h" | "";  // Atualizado
    startReleaseAt: string;
    endReleaseAt: string;
  }) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters,
      page: 1, // Resetar para a primeira página ao aplicar filtros
    }));
    setIsFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    setFilters(prev => ({
      ...prev,
      genreIds: [],
      duration_range: "",  // Atualizado
      startReleaseAt: "",
      endReleaseAt: "",
      page: 1,
    }));
    setIsFilterModalOpen(false);
  };

  return {
    movies,
    isLoading,
    totalPages,
    currentPage: filters.page,
    filters,
    isFilterModalOpen,
    handleSearch,
    handlePageChange,
    handleOpenFilterModal,
    handleCloseFilterModal,
    handleApplyFilters,
    handleClearFilters,
  };
}