import { useTheme } from "../../contexts/ThemeContext";

export function Background() {
  const { theme } = useTheme();
    const isDarkTheme = theme === "dark";

  return (
    <div className="fixed top-0 left-0 w-full h-[50vh] -z-10 pointer-events-none select-none">
      <img
        src="/src/assets/background.svg"
        alt="Pessoas assistindo a um filme no cinema"
        className="w-full h-full object-cover"
      />
      {/* Gradiente cobre toda a imagem, de baixo (escuro) para cima (transparente) */}
      <div
        className="absolute left-0 top-0 w-full h-full transition-theme"
        style={{
          background:
            isDarkTheme
              ? "linear-gradient(to top, rgb(18 17 19), rgba(18, 17, 19, 0.7))"
              :  "linear-gradient(to top, rgb(244 244 245), rgba(244, 244, 245, 0.7))",
        }}
      />
    </div>
  );
}
