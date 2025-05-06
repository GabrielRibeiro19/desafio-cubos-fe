import { useState } from "react";
import { Container } from "../../components/container";
import { AddMovie } from "./components/addMovie";
import { FilterModal } from "./components/filterModal";
import { MoviesFilters } from "./components/filters";
import { MoviesList } from "./components/movies";
import { MoviesPagination } from "./components/pagination";
import { useMovies } from "./useMovies";

export function Movies() {
  const {
    movies,
    isLoading,
    totalPages,
    currentPage,
    filters,
    isFilterModalOpen,
    handleSearch,
    handlePageChange,
    handleOpenFilterModal,
    handleCloseFilterModal,
    handleApplyFilters,
    handleClearFilters,
  } = useMovies();

  const [isAddMovieDrawerOpen, setIsAddMovieDrawerOpen] = useState(false);

  return (
    <Container>
      <div className="flex flex-col gap-6 w-full justify-center">
        <MoviesFilters
          searchTerm={filters.search}
          onSearch={handleSearch}
          onOpenFilters={handleOpenFilterModal}
          onOpenAddMovie={() => setIsAddMovieDrawerOpen(true)}
        />
        <MoviesList
          movies={movies}
          isLoading={isLoading}
        />
        <MoviesPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
        <FilterModal
          isOpen={isFilterModalOpen}
          onClose={handleCloseFilterModal}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          initialFilters={filters}
        />
        <AddMovie
          isOpen={isAddMovieDrawerOpen}
          onClose={() => setIsAddMovieDrawerOpen(false)}
        />
      </div>
    </Container>
  );
}
