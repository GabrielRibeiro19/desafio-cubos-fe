import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateGenre } from "../../../../hooks/genres/createGenre";
import { useListGenres } from "../../../../hooks/genres/listGenres";
import { useCreateMovie } from "../../../../hooks/movies/createMovie";

const createMovieSchema = z.object({
  title: z.string().min(1, "O título é obrigatório"),
  original_title: z.string().min(1, "O título original é obrigatório"),
  overview: z.string().min(10, "A sinopse deve ter pelo menos 10 caracteres"),
  tagline: z.string().optional(),
  image: z.instanceof(File, { message: "A imagem principal é obrigatória" }),
  image_secondary: z.instanceof(File).optional(),
  trailer_url: z.string().url("A URL do trailer deve ser válida"),
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
  duration: z.coerce
    .number()
    .min(0, "A duração deve ser maior ou igual a 0")
    .max(1000, "A duração deve ser menor ou igual a 1000"),
  genre_ids: z.array(z.string()).min(1, "Selecione pelo menos um gênero"),
})

type CreateMovieFormData = z.infer<typeof createMovieSchema>;

export function useAddMovie(onClose: () => void) {
  const [mainImagePreview, setMainImagePreview] = useState<string | null>(null);
  const [secondaryImagePreview, setSecondaryImagePreview] = useState<
    string | null
  >(null);
  const [newGenreName, setNewGenreName] = useState("");
  const [isAddingGenre, setIsAddingGenre] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<CreateMovieFormData>({
    resolver: zodResolver(createMovieSchema),
    defaultValues: {
      genre_ids: [],
      popularity: 0,
      votes: 0,
      rating: 0,
      budget: 0,
      revenue: 0,
      profit: 0,
    },
  });

  const selectedGenres = watch("genre_ids") || [];

  const { mutateAsync: createMovie, isPending } = useCreateMovie();
  const { mutateAsync: createGenre, isPending: isCreatingGenre } =
    useCreateGenre();
  const { data: genres } = useListGenres();

  const handleCreateMovie = async (data: CreateMovieFormData) => {
    try {
      await createMovie(data);
      handleCloseDrawer();
    } catch (error) {
      console.error("Erro ao adicionar filme:", error);
    }
  };

  const handleCloseDrawer = () => {
    reset();
    setMainImagePreview(null);
    setSecondaryImagePreview(null);
    setNewGenreName("");
    onClose();
  };

  // Função para lidar com o upload de imagens
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

  // Função para alternar a seleção de gêneros
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

  // Função para criar um novo gênero
  const handleCreateNewGenre = async () => {
    if (!newGenreName.trim()) return;

    try {
      setIsAddingGenre(true);
      const response = await createGenre(newGenreName);

      // Adicionar o novo gênero à seleção
      const genreId = response.id;
      if (genreId) {
        setValue("genre_ids", [...selectedGenres, genreId]);
      }

      // Limpar o campo
      setNewGenreName("");
    } catch (error) {
      console.error("Erro ao criar gênero:", error);
    } finally {
      setIsAddingGenre(false);
    }
  };

  return {
    handleCloseDrawer,
    handleSubmit,
    handleCreateMovie,
    register,
    errors,
    control,
    genres,
    mainImagePreview,
    secondaryImagePreview,
    handleImageChange,
    toggleGenre,
    selectedGenres,
    isPending,
    newGenreName,
    setNewGenreName,
    handleCreateNewGenre,
    isCreatingGenre,
    isAddingGenre,
  };
}
