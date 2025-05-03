import SearchIcon from "../../../assets/icons/Search.svg";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";

export function MoviesFilters() {
  return (
    <div className="flex flex-col md:flex-row w-full justify-end items-center gap-4">
      <Input
        name="search"
        width="half"
        placeholder="Pesquise por filmes"
        icon={SearchIcon}
      />
      <div className="flex gap-4 w-full md:w-fit">
        <Button variant="secondary" text="Filtros" />
        <Button text="Adicionar Filme" className="w-full md:w-fit" />
      </div>
    </div>
  );
}
