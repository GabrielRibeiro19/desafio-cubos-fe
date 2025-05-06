import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { FaX } from "react-icons/fa6";
import { Button } from "../../../../components/button";

interface DeleteMovieModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  movieTitle: string;
  isDeleting: boolean;
}

export function DeleteMovieModal({
  isOpen,
  onClose,
  onConfirm,
  movieTitle,
  isDeleting,
}: DeleteMovieModalProps) {
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
                  className="fixed inset-0 bg-black/60 z-[49]"
                />
              </Dialog.Overlay>

              <Dialog.Content asChild>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", damping: 20, stiffness: 300 }}
                  className="fixed z-50 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
                    bg-light-card dark:bg-dark-card text-light-text dark:text-dark-text p-6 rounded-lg shadow-lg w-[95vw] max-w-[450px]"
                >
                  <div className="flex justify-between items-center mb-6">
                    <Dialog.Title className="text-2xl font-bold text-light-text2 dark:text-dark-text2">
                      Excluir filme
                    </Dialog.Title>

                    <Dialog.Close asChild>
                      <button
                        className="cursor-pointer text-light-text hover:text-light-text2 dark:text-dark-text hover:dark:text-dark-text2"
                        aria-label="Close"
                        disabled={isDeleting}
                      >
                        <FaX size={25} title="Fechar" />
                      </button>
                    </Dialog.Close>
                  </div>

                  <div className="mb-8">
                    <p className="text-light-text2 dark:text-dark-text2">
                      Você tem certeza que deseja excluir o filme{" "}
                      <strong>{movieTitle}</strong>?
                    </p>
                    <p className="text-light-text3 dark:text-dark-text3 mt-2">
                      Esta ação não poderá ser desfeita.
                    </p>
                  </div>

                  <div className="flex justify-end gap-4">
                    <Button
                      text="Cancelar"
                      variant="secondary"
                      onClick={onClose}
                      disabled={isDeleting}
                    />
                    <Button
                      text={isDeleting ? "Excluindo..." : "Excluir"}
                      onClick={onConfirm}
                      disabled={isDeleting}
                      className="bg-red-600 hover:bg-red-700"
                    />
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
