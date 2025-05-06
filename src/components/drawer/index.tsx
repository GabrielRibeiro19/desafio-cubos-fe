import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { ReactNode, useEffect } from "react";

const variants = {
  right: {
    open: { x: 0 },
    closed: { x: "100%" }
  },
  left: {
    open: { x: 0 },
    closed: { x: "-100%" }
  },
  top: {
    open: { y: 0 },
    closed: { y: "-100%" }
  },
  bottom: {
    open: { y: 0 },
    closed: { y: "100%" }
  }
};

const classNames = {
  right: "inset-y-0 right-0",
  left: "inset-y-0 left-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0",
};

interface DrawerProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  side?: "right" | "left" | "top" | "bottom";
  children: ReactNode;
}

export function Drawer ({ open, setOpen, side = "right", children }: DrawerProps) {
  // Bloquear scroll quando o drawer estiver aberto
  useEffect(() => {
    if (open) {
      // Salvar a posição de scroll atual
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restaurar a posição de scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }

    return () => {
      // Limpar ao desmontar
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
    };
  }, [open]);

  // Fechar ao pressionar ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, setOpen]);

  return (
    <AnimatePresence>
      {open && (
        <div
          id={`dialog-${side}`}
          className="relative z-50"
          aria-labelledby="slide-over"
          role="dialog"
          aria-modal="true"
        >
          {/* Overlay com animação */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-[#B5B2BC40] bg-opacity-50"
            onClick={() => setOpen(false)}
          />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div
                className={clsx(
                  "pointer-events-none fixed max-w-full",
                  classNames[side],
                )}
              >
                {/* Drawer com animação */}
                <motion.div
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={variants[side]}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className={clsx(
                    "pointer-events-auto",
                    side === "right" || side === "left"
                      ? "w-screen max-w-md h-full"
                      : "h-screen max-h-[80vh] w-full"
                  )}
                >
                  <div className="flex h-full w-full flex-col overflow-y-auto bg-[#232225] shadow-xl">
                    {children}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
