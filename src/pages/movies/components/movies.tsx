import { IResponseMovie } from "../../../types/movie";
import { MoviesCard } from "./card";

interface MoviesListProps {
  movies: IResponseMovie[];
  isLoading: boolean;
}

export function MoviesList({ movies, isLoading }: MoviesListProps) {
  if (isLoading) {
    return (
      <div className="w-full p-6 bg-[#EBEAF814] rounded-sm flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-light-text2 dark:text-dark-text2 text-xl">Carregando filmes...</div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="w-full p-6 bg-[#EBEAF814] rounded-sm flex justify-center items-center min-h-[400px]">
        <div className="text-light-text2 dark:text-dark-text2 text-xl">Nenhum filme encontrado</div>
      </div>
    );
  }

  return (
    <div className="w-full p-6 bg-[#EBEAF814] rounded-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {movies.map((movie) => (
        <MoviesCard
          key={movie.id}
          id={movie.id}
          genres={movie.genres.map(genre => genre.title)}
          poster={movie.image_url}
          rating={movie.rating}
          title={movie.title}
        />
      ))}
    </div>
  );
}
