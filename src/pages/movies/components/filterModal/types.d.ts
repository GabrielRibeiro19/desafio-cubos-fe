export interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  onClear: () => void;
  initialFilters: {
    genreIds: string[];
    duration_range: "less_than_1h" | "between_1h_and_2h" | "more_than_2h" | "";
    startReleaseAt: string;
    endReleaseAt: string;
  };
}