import { Container } from "../../components/container";
import { MoviesFilters } from "./components/filters";
import { MoviesList } from "./components/movies";
import { MoviesPagination } from "./components/pagination";

export function Movies() {
  return (
    <Container>
      <div className="flex flex-col gap-6 w-full justify-center">
        <MoviesFilters />
        <MoviesList />
        <MoviesPagination />
      </div>
    </Container>
  );
}
