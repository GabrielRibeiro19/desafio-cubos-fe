import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { FaX } from "react-icons/fa6";
import { Button } from "../../../../components/button";
import { Input } from "../../../../components/input";
import { FilterModalProps } from "./types";
import { useFilterModal } from "./useFilterModal";

export function FilterModal({
  isOpen,
  onClose,
  onApply,
  onClear,
  initialFilters,
}: FilterModalProps) {
  const {
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
  } = useFilterModal({
    isOpen,
    onClear,
    onClose,
    onApply,
    initialFilters,
  });

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <AnimatePresence>
          {isOpen && (
            <>
              <Dialog.Overlay asChild>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-light-overlay dark:bg-dark-overlay z-[49]"
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="fixed z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
                    bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text p-6 rounded-lg shadow-lg w-[95vw] max-w-[500px] max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex justify-between items-center mb-6">
                    <Dialog.Title className="text-2xl font-bold text-light-text2 dark:text-dark-text2">
                      Filtros
                    </Dialog.Title>
                    <Dialog.Close asChild>
                      <button
                        className="cursor-pointer text-light-text3 dark:text-dark-text3 hover:text-light-text2 dark:hover:text-dark-text2 transition-colors"
                        aria-label="Close"
                      >
                        <FaX size={20} title="Fechar" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="space-y-6">
                    {/* Categorias/Gêneros */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-light-text2 dark:text-dark-text2">
                        Categorias
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {genres?.map((genre) => (
                          <Button
                            key={genre.id}
                            text={genre.title}
                            variant={
                              selectedGenres.includes(genre.id)
                                ? "primary"
                                : "secondary"
                            }
                            onClick={() => toggleGenre(genre.id)}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Duração - Com os novos valores */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-light-text2 dark:text-dark-text2">
                        Duração
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <Button
                          text="Menos de 1h"
                          variant={
                            durationRange === "less_than_1h" ? "primary" : "secondary"
                          }
                          onClick={() =>
                            setDurationRange(durationRange === "less_than_1h" ? "" : "less_than_1h")
                          }
                        />
                        <Button
                          text="1h - 2h"
                          variant={
                            durationRange === "between_1h_and_2h" ? "primary" : "secondary"
                          }
                          onClick={() =>
                            setDurationRange(durationRange === "between_1h_and_2h" ? "" : "between_1h_and_2h")
                          }
                        />
                        <Button
                          text="Mais de 2h"
                          variant={
                            durationRange === "more_than_2h" ? "primary" : "secondary"
                          }
                          onClick={() =>
                            setDurationRange(durationRange === "more_than_2h" ? "" : "more_than_2h")
                          }
                        />
                      </div>
                    </div>

                    {/* Data de Lançamento */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4 text-light-text2 dark:text-dark-text2">
                        Data de Lançamento
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1 text-light-text2 dark:text-dark-text2">
                            De
                          </label>
                          <Input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 text-light-text2 dark:text-dark-text2">
                            Até
                          </label>
                          <Input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Ações */}
                  <div className="flex justify-between mt-8">
                    <Button
                      text="Limpar Filtros"
                      variant="secondary"
                      onClick={onClear}
                    />
                    <Button text="Aplicar" onClick={handleApply} />
                  </div>
                </motion.div>
              </Dialog.Content>
            </>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
