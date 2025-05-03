import posterImg from "../../../assets/Poster.svg";
import { MoviesCard } from "./card";

export function MoviesList() {
  return (
    <div className="w-full p-6 bg-[#EBEAF814] rounded-sm grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {Array.from({ length: 20 }, (_, index) => (
        <MoviesCard
          genres={["Ação", "Aventura", "Drama", "Comédia", "Terror"]}
          poster={posterImg}
          rating={Math.floor(Math.random() * 100)}
          title="Título do Filme"
          key={index}
        />
      ))}
    </div>
  );
}
