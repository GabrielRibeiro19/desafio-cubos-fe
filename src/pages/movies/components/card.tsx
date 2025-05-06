import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ProgressBar } from "../../../components/progressBar";

interface MovieCardProps {
  id: string;
  title: string;
  genres: string[];
  rating: number; // 0-100
  poster: string;
}

export function MoviesCard({ id, title, genres, rating, poster }: MovieCardProps) {
  return (
    <Link to={`/movies/${id}`}>
      <motion.div
        className="relative w-full h-full rounded-lg overflow-hidden cursor-pointer shadow-lg group"
        initial="rest"
        whileHover="hover"
        animate="rest"
      >
        {/* Poster */}
        <img
          src={poster || "https://placehold.co/236x355.png"}
          alt={title}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = "https://placehold.co/236x355.png";
          }}
        />

        {/* Overlay escura ao hover */}
        <motion.div
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          className="absolute inset-0 bg-light-overlay dark:bg-dark-overlay text-light-text2 dark:text-dark-text2 flex flex-col items-center justify-center transition-opacity"
        >
          {/* Porcentagem centralizada com CircularProgressbar */}
          <motion.div
            variants={{
              rest: { scale: 0 },
              hover: { scale: 1 },
            }}
            className="w-24 h-24"
          >
            <ProgressBar percentage={rating} />
          </motion.div>
        </motion.div>

        {/* Container do título + categorias (parte inferior) */}
        <motion.div
          variants={{
            rest: { y: 0 },
            hover: { y: -10 },
          }}
          className="absolute bottom-0 left-0 w-full bg-light-overlay dark:bg-dark-overlay px-4 py-2 text-light-text2 dark:text-dark-text2 text-sm font-semibold z-10"
        >
          <div className="uppercase">{title}</div>

          {/* Categorias aparecem apenas ao hover */}
          <motion.div
            variants={{
              rest: { opacity: 0, height: 0 },
              hover: { opacity: 1, height: "auto" },
            }}
            className="text-xs text-light-text3 dark:text-dark-text3 mt-1 overflow-hidden"
          >
            {genres.join(", ")}
          </motion.div>
        </motion.div>
      </motion.div>
    </Link>
  );
}
