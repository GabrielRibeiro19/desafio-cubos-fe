import { Button } from "../../components/button";
import { Container } from "../../components/container";
import { Drawer } from "../../components/drawer";
import { ProgressBar } from "../../components/progressBar";
import { DeleteMovieModal } from "./components/deleteMovieModal";
import { MovieEditForm } from "./components/editMovie";
import { useMovie } from "./useMovie";

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-light-overlay dark:bg-dark-overlay p-3 rounded-sm flex flex-1 flex-col gap-2">
      <p className="text-xs text-light-muted dark:text-dark-muted font-bold">{label}</p>
      <p className="text-sm font-medium text-light-text dark:text-dark-text">{value}</p>
    </div>
  );
}

export function Movie() {
  const {
    movie,
    isLoading,
    isError,
    isEditDrawerOpen,
    isDeleteModalOpen,
    originalMovieData,
    handleEditMovie,
    handleCloseEditDrawer,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteMovie,
    isDeleting
  } = useMovie();

  if (isLoading) {
    return (
      <Container>
        <div className="w-full min-h-[70vh] flex items-center justify-center">
          <div className="text-light-text2 dark:text-dark-text2 text-xl animate-pulse">
            Carregando informações do filme...
          </div>
        </div>
      </Container>
    );
  }

  if (isError || !movie) {
    return (
      <Container>
        <div className="w-full min-h-[70vh] flex items-center justify-center">
          <div className="text-light-text2 dark:text-dark-text2 text-xl">
            Erro ao carregar informações do filme.
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-6">
        <div
          className="bg-light-card dark:bg-dark-card text-light-text2 dark:text-dark-text2 p-6 rounded-lg shadow-lg relative"
          style={{
            backgroundImage: `url(${movie.image_secondary_url || "https://placehold.co/1280x720.png"})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute top-0 left-0 w-full h-full bg-light-overlay dark:bg-dark-overlay rounded-lg" />
          <div className="flex flex-col gap-8">
            <div className="hidden md:flex justify-between gap-4 z-10">
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-semibold">{movie.title}</h1>
                <p className="text-light-text2 dark:text-dark-text2 text-sm">
                  Título original: {movie.originalTitle}{" "}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  text="Deletar"
                  variant="secondary"
                  onClick={handleOpenDeleteModal}
                  disabled={isDeleting}
                />
                <Button text="Editar" onClick={handleEditMovie} />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-4 w-full z-10">
              <div className="h-full w-full md:max-w-[236px]">
                <img
                  src={movie.image_url || "https://placehold.co/236x355.png"}
                  alt={`Poster do filme ${movie.title}`}
                  className="rounded-sm shadow-md w-full"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/236x355.png";
                  }}
                />
              </div>
              <div className="w-full flex flex-col-reverse md:hidden justify-between gap-4">
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-semibold">{movie.title}</h1>
                  <p className="text-light-text2 dark:text-dark-text2 text-sm">
                    Título original: {movie.originalTitle}{" "}
                  </p>
                </div>
                <div className="flex items-center gap-4 w-full">
                  <Button
                    text="Deletar"
                    variant="secondary"
                    onClick={handleOpenDeleteModal}
                    disabled={isDeleting}
                  />
                  <Button
                    text="Editar"
                    onClick={handleEditMovie}
                    className="w-full"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-4">
                <div className="w-full flex flex-col-reverse md:flex-row items-center gap-4 justify-between">
                  <p className="text-light-text2 dark:text-dark-text2 text-sm w-full">
                    {movie.tagline}
                  </p>
                  <div className="flex items-center gap-4 w-full justify-between">
                    <InfoBox label="POPULARIDADE" value={movie.popularity} />
                    <InfoBox label="VOTOS" value={movie.votes} />
                    <div className="max-w-[100px] w-full">
                      <ProgressBar percentage={movie.rating} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col md:flex-row gap-4 w-full">
                  <div className="flex flex-col gap-4 w-full">
                    <div className="bg-light-overlay dark:bg-dark-overlay p-3 rounded">
                      <p className="text-light-muted dark:text-dark-muted font-bold">SINOPSE</p>
                      <p className="text-sm">{movie.overview}</p>
                    </div>

                    <div className="bg-light-overlay dark:bg-dark-overlay p-3 rounded flex flex-col gap-2">
                      <p className="text-xs text-light-muted dark:text-dark-muted font-bold">GÊNEROS</p>
                      <div className="flex flex-wrap gap-2">
                        {movie.genres.map((genre, index) => (
                          <Button
                            key={index}
                            variant="secondary"
                            text={genre}
                            className="bg-[#C150FF2E]"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-4 w-full">
                    <div className="w-full grid grid-cols-2 gap-4 text-sm">
                      <InfoBox label="LANÇAMENTO" value={movie.releaseDate} />
                      <InfoBox label="DURAÇÃO" value={movie.runtime} />
                      <InfoBox label="SITUAÇÃO" value={movie.status} />
                      <InfoBox label="IDIOMA" value={movie.language} />
                    </div>

                    <div className="w-full grid grid-cols-3 gap-4 text-sm">
                      <InfoBox label="ORÇAMENTO" value={movie.budget} />
                      <InfoBox label="RECEITA" value={movie.revenue} />
                      <InfoBox label="LUCRO" value={movie.profit} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {movie?.embed_trailer_url && (
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-light-text2 dark:text-dark-text2">Trailer</h2>
            <iframe
              width="100%"
              height="532"
              src={movie.embed_trailer_url}
              title={`${movie.title} - Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        )}
      </div>

      {/* Drawer de edição */}
      <Drawer
        open={isEditDrawerOpen}
        setOpen={handleCloseEditDrawer}
        side="right"
      >
        <MovieEditForm movieData={originalMovieData} onClose={handleCloseEditDrawer} />
      </Drawer>

      {/* Modal de confirmação de exclusão */}
      <DeleteMovieModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteMovie}
        movieTitle={movie.title}
        isDeleting={isDeleting}
      />
    </Container>
  );
}
