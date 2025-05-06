import { CurrencyInput } from "react-currency-mask";
import { Controller } from "react-hook-form";
import { AiOutlineLoading } from "react-icons/ai";
import { FaPlus, FaX } from "react-icons/fa6";
import { Button } from "../../../../components/button";
import { DeleteGenreModal } from "../../../../components/deleteGenreModal";
import { Input } from "../../../../components/input";
import { IResponseMovie } from "../../../../types/movie";
import { useEditMovie } from "./useEditMovie";

interface MovieEditFormProps {
  movieData?: IResponseMovie;
  onClose: () => void;
}

export function MovieEditForm({ movieData, onClose }: MovieEditFormProps) {
  const {
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
    allGenres,
    selectedGenres,
    toggleGenre,
    isGenreDeleteModalOpen,
    handleOpenDeleteGenreModal,
    handleCloseDeleteGenreModal,
    handleDeleteGenre,
    genreToDelete,
    isDeletingGenre,
  } = useEditMovie(movieData, onClose);

  return (
    <div className="bg-light-card dark:bg-dark-card text-light-text2 dark:text-dark-text2 p-6 h-full overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-light-muted dark:text-dark-muted">
          Editar Filme
        </h2>
        <button
          onClick={handleCloseDrawer}
          className="cursor-pointer text-light-text2 dark:text-dark-text2 dark:hover:text-dark-text3 hover:text-light-text2 transition-colors duration-200"
        >
          <FaX size={25} title="Fechar" />
        </button>
      </div>

      <form
        onSubmit={handleSubmit(handleUpdateMovie)}
        className="flex flex-col gap-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Título"
            error={errors.title?.message}
            isMandatory
            {...register("title")}
          />

          <Input
            label="Título Original"
            error={errors.original_title?.message}
            isMandatory
            {...register("original_title")}
          />
        </div>

        <Input
          label="Tagline"
          error={errors.tagline?.message}
          {...register("tagline")}
        />

        <div>
          <label className="text-sm font-medium text-light-text2 dark:text-dark-text2 mb-2 block">
            Sinopse <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Escreva uma breve sinopse do filme"
            className="w-full border-1 border-light-border dark:border-dark-border rounded-sm p-2 min-h-[120px] bg-light-input text-light-text2 dark:bg-dark-input dark:text-dark-text2 placeholder:text-light-muted dark:placeholder:text-dark-muted/50 focus:outline-none focus:border-[#8E4EC6] transition-all duration-200"
            {...register("overview")}
          />
          {errors.overview?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.overview.message}
            </p>
          )}
        </div>

        {/* Imagens */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-light-text2 dark:text-dark-text2 mb-2 block">
              Imagem Principal <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, "main")}
            />
            <label
              htmlFor="image"
              className="w-full h-40 border-1 border-dashed border-[#3C393F] rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-[#8E4EC6] transition-all duration-200"
            >
              {mainImagePreview ? (
                <img
                  src={mainImagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <span className="block text-3xl mb-2">+</span>
                  <span>Clique para alterar</span>
                </div>
              )}
            </label>
            {errors.image?.message && (
              <p className="text-red-500 text-sm mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm font-medium text-light-text2 dark:text-dark-text2 mb-2 block">
              Imagem Secundária
            </label>
            <input
              type="file"
              id="image_secondary"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageChange(e, "secondary")}
            />
            <label
              htmlFor="image_secondary"
              className="w-full h-40 border-1 border-dashed border-[#3C393F] rounded-sm flex flex-col items-center justify-center cursor-pointer hover:border-[#8E4EC6] transition-all duration-200"
            >
              {secondaryImagePreview ? (
                <img
                  src={secondaryImagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center">
                  <span className="block text-3xl mb-2">+</span>
                  <span>Clique para adicionar</span>
                </div>
              )}
            </label>
          </div>
        </div>

        <Input
          label="URL do Trailer"
          error={errors.trailer_url?.message}
          isMandatory
          placeholder="https://www.youtube.com/watch?v=..."
          {...register("trailer_url")}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Popularidade"
            type="number"
            isMandatory
            error={errors.popularity?.message}
            min="0"
            step="0.1"
            {...register("popularity")}
          />

          <Input
            label="Votos"
            isMandatory
            type="number"
            error={errors.votes?.message}
            min="0"
            {...register("votes")}
          />

          <Input
            label="Avaliação (%)"
            type="number"
            isMandatory
            error={errors.rating?.message}
            min="0"
            max="100"
            {...register("rating")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Data de Lançamento"
            type="date"
            error={errors.release_date?.message}
            isMandatory
            {...register("release_date")}
          />

          <Input
            label="Duração (minutos)"
            type="number"
            placeholder="Ex: 150"
            error={errors.duration?.message}
            isMandatory
            {...register("duration")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Status"
            placeholder="Lançado"
            error={errors.status?.message}
            isMandatory
            {...register("status")}
          />

          <Input
            label="Idioma"
            placeholder="Português"
            error={errors.language?.message}
            isMandatory
            {...register("language")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Controller
            name="budget"
            control={control}
            rules={{
              required: "Campo obrigatório",
              validate: (value) => {
                if (value < 0) {
                  return "O valor deve ser maior ou igual a zero";
                }
              },
            }}
            render={({ field }) => (
              <CurrencyInput
                value={field.value}
                defaultValue={0}
                onChangeValue={(_, value) => {
                  field.onChange(value);
                }}
                InputElement={
                  <Input
                    label="Orçamento (R$)"
                    isMandatory
                    error={errors.budget?.message}
                  />
                }
              />
            )}
          />

          <Controller
            name="revenue"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                value={field.value}
                defaultValue={0}
                onChangeValue={(_, value) => {
                  field.onChange(value);
                }}
                InputElement={
                  <Input
                    label="Receita (R$)"
                    error={errors.revenue?.message}
                    isMandatory
                  />
                }
              />
            )}
          />

          <Controller
            name="profit"
            control={control}
            render={({ field }) => (
              <CurrencyInput
                value={field.value}
                defaultValue={0}
                onChangeValue={(_, value) => {
                  field.onChange(value);
                }}
                InputElement={
                  <Input
                    label="Lucro (R$)"
                    error={errors.profit?.message}
                    isMandatory
                  />
                }
              />
            )}
          />
        </div>

        {/* Gêneros */}
        <div>
          <div className="flex gap-4 justify-between items-center">
            <label className="text-sm font-medium text-light-text2 dark:text-dark-text2 flex-1 flex gap-1">
              Gêneros <span className="text-red-500"> *</span>
            </label>

            {/* Input para adicionar novo gênero */}
            <div className="flex gap-2 items-center w-full">
              <Input
                placeholder="Adicionar novo gênero"
                value={newGenreName}
                onChange={(e) => setNewGenreName(e.target.value)}
              />
              <Button
                text={
                  isAddingGenre ? (
                    <AiOutlineLoading
                      className="animate-spin text-light-text2 dark:text-dark-text2"
                      size={20}
                      title="Carregando"
                    />
                  ) : (
                    <FaPlus
                      className="text-light-text2 dark:text-dark-text2"
                      size={20}
                      title="Adicionar novo gênero"
                    />
                  )
                }
                onClick={handleCreateNewGenre}
                disabled={isAddingGenre || !newGenreName.trim()}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {/* Lista de todos os gêneros disponíveis */}
            {allGenres?.map((genre) => (
              <div key={genre.id} className="flex items-center gap-1">
                <Button
                  text={genre.title}
                  type="button"
                  variant={
                    selectedGenres.includes(genre.id) ? "primary" : "secondary"
                  }
                  onClick={() => toggleGenre(genre.id)}
                />
                <button
                  type="button"
                  className="cursor-pointer bg-gray-700 hover:bg-red-700 text-white rounded-full p-1 text-xs duration-200"
                  title="Excluir gênero"
                  onClick={() => handleOpenDeleteGenreModal(genre)}
                >
                  <FaX title="Excluir gênero" />
                </button>
              </div>
            ))}
          </div>
          {errors.genre_ids?.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.genre_ids.message}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <Button
            text="Cancelar"
            variant="secondary"
            type="button"
            onClick={handleCloseDrawer}
          />
          <Button
            text={isUpdating ? "Salvando..." : "Salvar"}
            type="submit"
            disabled={isUpdating}
          />
        </div>
      </form>

      {/* Modal de confirmação de exclusão de gênero */}
      <DeleteGenreModal
        isOpen={isGenreDeleteModalOpen}
        onClose={handleCloseDeleteGenreModal}
        onConfirm={handleDeleteGenre}
        genreTitle={genreToDelete?.title || ""}
        isDeleting={isDeletingGenre}
      />
    </div>
  );
}
