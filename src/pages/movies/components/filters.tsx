import { useState, useEffect } from "react";
import SearchIcon from "../../../assets/icons/Search.svg";
import { Button } from "../../../components/button";
import { Input } from "../../../components/input";

interface MoviesFiltersProps {
  searchTerm: string;
  onSearch: (search: string) => void;
  onOpenFilters: () => void;
  onOpenAddMovie: () => void;
}

export function MoviesFilters({ searchTerm, onSearch, onOpenFilters, onOpenAddMovie }: MoviesFiltersProps) {
  const [search, setSearch] = useState(searchTerm);

  // Sincronizar o estado interno com a prop
  useEffect(() => {
    setSearch(searchTerm);
  }, [searchTerm]);

  // Debounce para evitar muitas requisições
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== searchTerm) {
        onSearch(search);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [search, onSearch, searchTerm]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <div className="flex flex-col md:flex-row w-full justify-end items-center gap-4">
      <Input
        name="search"
        value={search}
        onChange={handleSearchChange}
        width="half"
        placeholder="Pesquise por filmes"
        icon={SearchIcon}
      />
      <div className="flex gap-4 w-full md:w-fit">
        <Button variant="secondary" text="Filtros" onClick={onOpenFilters} />
        <Button text="Adicionar Filme" onClick={onOpenAddMovie} className="w-full" />
      </div>
    </div>
  );
}