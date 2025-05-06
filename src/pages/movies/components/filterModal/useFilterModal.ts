import { useEffect, useState } from "react";
import { useListGenres } from "../../../../hooks/genres/listGenres";
import { FilterModalProps } from "./types";

export function useFilterModal({
  isOpen,
  onClose,
  onApply,
  initialFilters,
}: FilterModalProps) {
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    initialFilters.genreIds || [],
  );
  const [durationRange, setDurationRange] = useState(initialFilters.duration_range || "");  // Atualizado
  const [startDate, setStartDate] = useState(
    initialFilters.startReleaseAt || "",
  );
  const [endDate, setEndDate] = useState(initialFilters.endReleaseAt || "");

  // Reset state when modal opens with new initialFilters
  useEffect(() => {
    if (isOpen) {
      setSelectedGenres(initialFilters.genreIds || []);
      setDurationRange(initialFilters.duration_range || "");  // Atualizado
      setStartDate(initialFilters.startReleaseAt || "");
      setEndDate(initialFilters.endReleaseAt || "");
    }
  }, [isOpen, initialFilters]);

  // Fetch genres
  const { data: genres } = useListGenres();

  // Toggle genre selection
  const toggleGenre = (genreId: string) => {
    setSelectedGenres((prev) => {
      if (prev.includes(genreId)) {
        return prev.filter((id) => id !== genreId);
      } else {
        return [...prev, genreId];
      }
    });
  };

  const handleApply = () => {
    onApply({
      genreIds: selectedGenres,
      duration_range: durationRange,  // Atualizado
      startReleaseAt: startDate,
      endReleaseAt: endDate,
    });
    onClose();
  };

  return {
    genres,
    selectedGenres,
    durationRange,
    startDate,
    endDate,
    toggleGenre,
    setDurationRange,
    setStartDate,
    setEndDate,
    handleApply,
  };
}
