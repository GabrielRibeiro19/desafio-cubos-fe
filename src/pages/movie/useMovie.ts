import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useDeleteMovie } from "../../hooks/movies/deleteMovie";
import { useGetMovie } from "../../hooks/movies/getMovie";

export function useMovie() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Buscar dados do filme
  const {
    data: movie,
    isLoading,
    isError,
    error
  } = useGetMovie(id || '');

  // Hook para deletar filme
  const { mutateAsync: deleteMovie, isPending: isDeleting } = useDeleteMovie();

  useEffect(() => {
    if (isError) {
      toast.error("Erro ao carregar o filme");
      console.error("Erro ao carregar filme:", error);
    }
  }, [isError, error]);

  // Funções de manipulação do filme
  const handleEditMovie = () => {
    setIsEditDrawerOpen(true);
  };

  const handleCloseEditDrawer = () => {
    setIsEditDrawerOpen(false);
  };

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const handleDeleteMovie = async () => {
    try {
      if (!id) return;

      await deleteMovie(id);
      navigate('/movies');
    } catch (err) {
      console.error("Erro ao deletar filme:", err);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  // Formatar dados para exibição
  const formatMovieData = () => {
    if (!movie) return null;

    return {
      id: movie.id,
      title: movie.title,
      originalTitle: movie.original_title,
      tagline: movie.tagline, // Não tem no tipo, você pode adicionar se tiver
      overview: movie.overview || "",
      popularity: String(movie.popularity || 0),
      votes: String(movie.votes || 0),
      rating: movie.rating || 0,
      releaseDate: movie.release_date
        ? new Date(movie.release_date).toLocaleDateString('pt-BR')
        : "",
      runtime: movie.formattedDuration || "",
      status: movie.status || "",
      language: movie.language || "",
      budget: movie.budget ? `R$${(movie.budget / 1000000).toFixed(0)}M` : "-",
      revenue: movie.revenue ? `R$${(movie.revenue / 1000000).toFixed(0)}M` : "-",
      profit: movie.profit ? `R$${(movie.profit / 1000000).toFixed(0)}M` : "-",
      genres: movie.genres.map(genre => genre.title),
      image_url: movie.image_url,
      embed_trailer_url: movie.embed_trailer_url,
      image_secondary_url: movie.image_secondary_url
    };
  };

  return {
    movie: formatMovieData(),
    originalMovieData: movie,
    isLoading,
    isError,
    isEditDrawerOpen,
    setIsEditDrawerOpen,
    isDeleteModalOpen,
    setIsDeleteModalOpen,
    handleEditMovie,
    handleCloseEditDrawer,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteMovie,
    isDeleting
  };
}
