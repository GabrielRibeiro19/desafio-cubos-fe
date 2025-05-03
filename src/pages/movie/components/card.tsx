import { motion } from "motion/react";

interface MovieCardProps {
  title: string;
  genres: string[];
  rating: number; // 0-100
  poster: string;
}

export function MoviesCard({
  title,
  genres,
  rating,
  poster,
}: MovieCardProps) {
  return (
    <motion.div
      className="relative w-full rounded-lg overflow-hidden cursor-pointer shadow-lg group"
      initial="rest"
      whileHover="hover"
      animate="rest"
    >
      {/* Poster */}
      <img src={poster} alt={title} className="w-full h-full object-cover" />

      {/* Overlay escura ao hover */}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        className="absolute inset-0 bg-black/70 text-white flex flex-col items-center justify-center transition-opacity"
      >
        {/* Porcentagem centralizada */}
        <motion.div
          variants={{
            rest: { scale: 0 },
            hover: { scale: 1 },
          }}
          className="w-36 h-36 rounded-full border-8 border-yellow-400 flex items-center justify-center text-yellow-400 font-bold text-2xl bg-black/60"
        >
          {rating}%
        </motion.div>
      </motion.div>

      {/* Container do título + categorias (parte inferior) */}
      <motion.div
        variants={{
          rest: { y: 0 },
          hover: { y: -10 },
        }}
        className="absolute bottom-0 left-0 w-full bg-black/20 px-4 py-2 text-white text-sm font-semibold z-10"
      >
        <div className="uppercase">{title}</div>

        {/* Categorias aparecem apenas ao hover */}
        <motion.div
          variants={{
            rest: { opacity: 0, height: 0 },
            hover: { opacity: 1, height: "auto" },
          }}
          className="text-xs text-[#B4B4B4] mt-1 overflow-hidden"
        >
          {genres.join(", ")}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
