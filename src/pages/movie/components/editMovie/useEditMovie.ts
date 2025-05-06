import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateGenre } from "../../../../hooks/genres/createGenre";
import { useDeleteGenre } from "../../../../hooks/genres/deleteGenre";
import { useListGenres } from "../../../../hooks/genres/listGenres";
import { useUpdateMovie } from "../../../../hooks/movies/updateMovie";
import { IResponseMovie } from "../../../../types/movie";

const updateMovieSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  original_title: z.string().min(1, "O título original é obrigatório"),
  overview: z.string().min(10, "A sinopse deve ter pelo menos 10 caracteres"),
  image: z.union([z.instanceof(File), z.string()]).optional(),
  image_secondary: z.union([z.instanceof(File), z.string()]).optional(),
  trailer_url: z.string().url("A URL do trailer deve ser válida"),
  tagline: z.string(),
  popularity: z.coerce
    .number()
    .min(0, "A popularidade deve ser maior ou igual a 0"),
  votes: z.coerce.number().min(0, "Os votos devem ser maior ou igual a 0"),
  rating: z.coerce
    .number()
    .min(0, "A avaliação deve ser maior ou igual a 0")
    .max(100, "A avaliação deve ser menor ou igual a 100"),
  release_date: z.string().min(1, "A data de lançamento é obrigatória"),
  status: z.string().min(1, "O status é obrigatório"),
  language: z.string().min(1, "O idioma é obrigatório"),
  budget: z.coerce.number().min(0, "O orçamento deve ser maior ou igual a 0"),
  revenue: z.coerce.number().min(0, "A receita deve ser maior ou igual a 0"),
  profit: z.coerce.number().min(0, "O lucro deve ser maior ou igual a 0"),
  duration: z.string().min(1, "A duração é obrigatória"),
  genre_ids: z.array(z.string()).min(1, "Selecione pelo menos um gênero"),
});

type UpdateMovieFormData = z.infer<typeof updateMovieSchema>;

export function useEditMovie(
  movieData: IResponseMovie | undefined,
  onClose: () => void,
) {
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(
    movieData?.image_url || null,
  );
  const [secondaryImagePreview, setSecondaryImagePreview] = useState<
    string | null
  >(movieData?.image_secondary_url || null);
  const [newGenreName, setNewGenreName] = useState("");
  const [isAddingGenre, setIsAddingGenre] = useState(false);
  const [isGenreDeleteModalOpen, setIsGenreDeleteModalOpen] = useState(false);
  const [genreToDelete, setGenreToDelete] = useState<{
    id: string;
    title: string;
  } | null>(null);

  // Extract genres from movie data
  const originalGenres = movieData?.genres || [];

  // Get all available genres from API
  const { data: allGenres = [], refetch: refetchGenres } = useListGenres();

  // Find genre IDs that match the movie's genres
  // const selectedGenreIds = allGenres
  //   .filter(genre => originalGenres.includes(genre.title))
  //   .map(genre => genre.id);

  const selectedGenreIds = originalGenres.map((genre) => genre.id);

  // Initialize form with movie data
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<UpdateMovieFormData>({
    resolver: zodResolver(updateMovieSchema),
    defaultValues: {
      ...movieData,
      tagline: movieData?.tagline || "",
      genre_ids: selectedGenreIds,
    },
  });

  const selectedGenres = watch("genre_ids") || [];

  const { mutateAsync: updateMovie, isPending: isUpdating } = useUpdateMovie();
  const { mutateAsync: createGenre, isPending: isCreatingGenre } =
    useCreateGenre();
  const { mutateAsync: deleteGenre, isPending: isDeletingGenre } =
    useDeleteGenre();

  // Update selected genres when allGenres changes
  useEffect(() => {
    if (
      allGenres.length > 0 &&
      originalGenres.length > 0 &&
      selectedGenres.length === 0
    ) {
      const matchedGenreIds = allGenres
        .filter((genre) =>
          originalGenres.some((originalGenre) => originalGenre.id === genre.id),
        )
        .map((genre) => genre.id);

      setValue("genre_ids", matchedGenreIds);
    }
  }, [allGenres, originalGenres]);

  const handleUpdateMovie = async (data: UpdateMovieFormData) => {
    try {
      // Prepare form data for image uploads
      const formData = new FormData();

      // Add regular fields
      if (movieData) {
        formData.append("id", movieData.id || "");
        formData.append("title", data.title);
        formData.append("original_title", data.original_title);
        formData.append("overview", data.overview);
        formData.append("tagline", data.tagline || "");
        formData.append("trailer_url", data.trailer_url);
        formData.append("popularity", String(data.popularity));
        formData.append("votes", String(data.votes));
        formData.append("rating", String(data.rating));
        formData.append("release_date", data.release_date);
        formData.append("status", data.status);
        formData.append("language", data.language);
        formData.append("budget", String(data.budget));
        formData.append("revenue", String(data.revenue));
        formData.append("profit", String(data.profit));
        formData.append("duration", data.duration);
      }

      // Add genre IDs
      if (data.genre_ids && data.genre_ids.length > 0) {
        data.genre_ids.forEach((genreId) => {
          formData.append("genre_ids", genreId);
        });
      }

      // Add images if new ones were selected
      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      if (data.image_secondary instanceof File) {
        formData.append("image_secondary", data.image_secondary);
      }

      await updateMovie(formData);
      handleCloseDrawer();
    } catch (error) {
      console.error("Erro ao atualizar filme:", error);
    }
  };

  const handleCloseDrawer = () => {
    reset();
    onClose();
  };

  // Handle image changes
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    imageType: "main" | "secondary",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (imageType === "main") {
      setValue("image", file);
      setMainImagePreview(URL.createObjectURL(file));
    } else {
      setValue("image_secondary", file);
      setSecondaryImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle genre selection
  const toggleGenre = (genreId: string) => {
    const currentGenres = [...selectedGenres];
    const index = currentGenres.indexOf(genreId);

    if (index === -1) {
      currentGenres.push(genreId);
    } else {
      currentGenres.splice(index, 1);
    }

    setValue("genre_ids", currentGenres);
  };

  // Create new genre
  const handleCreateNewGenre = async () => {
    if (!newGenreName.trim()) return;

    try {
      setIsAddingGenre(true);
      const response = await createGenre(newGenreName);

      const genreId = response.id;
      if (genreId) {
        setValue("genre_ids", [...selectedGenres, genreId]);
      }

      // Clear input
      setNewGenreName("");
    } catch (error) {
      console.error("Erro ao criar gênero:", error);
    } finally {
      setIsAddingGenre(false);
    }
  };

  // Open delete genre confirmation modal
  const handleOpenDeleteGenreModal = (genre: { id: string; title: string }) => {
    setGenreToDelete(genre);
    setIsGenreDeleteModalOpen(true);
  };

  // Close delete genre confirmation modal
  const handleCloseDeleteGenreModal = () => {
    setIsGenreDeleteModalOpen(false);
    setGenreToDelete(null);
  };

  // Delete genre
  const handleDeleteGenre = async () => {
    if (!genreToDelete) return;

    try {
      await deleteGenre(genreToDelete.id);

      // Remove the genre from selection if it was selected
      if (selectedGenres.includes(genreToDelete.id)) {
        setValue(
          "genre_ids",
          selectedGenres.filter((id) => id !== genreToDelete.id),
        );
      }

      // Refresh genres list
      await refetchGenres();
    } catch (error) {
      console.error("Erro ao excluir gênero:", error);
    } finally {
      handleCloseDeleteGenreModal();
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    control,
    isUpdating,
    handleUpdateMovie,
    handleCloseDrawer,
    mainImagePreview,
    secondaryImagePreview,
    handleImageChange,
    newGenreName,
    setNewGenreName,
    handleCreateNewGenre,
    isAddingGenre,
    isCreatingGenre,
    allGenres,
    selectedGenres,
    toggleGenre,
    isGenreDeleteModalOpen,
    handleOpenDeleteGenreModal,
    handleCloseDeleteGenreModal,
    handleDeleteGenre,
    genreToDelete,
    isDeletingGenre,
  };
}
