import { Link } from "react-router-dom";
import logoImg from "../../assets/Cubos Logo.svg";
import { useTheme } from "../../contexts/ThemeContext";
import { Button } from "../button";
import { Container } from "../container";
import { useHeader } from "./useHeader";
import logoImgMobile from "/favicon.svg";

import moonIcon from "../../assets/icons/Moon.svg";
import sunIcon from "../../assets/icons/Sun.svg";

export function Header() {
  const { isFixed, handleSignOut } = useHeader();
  const { theme, toggleTheme } = useTheme();
  const isDarkTheme = theme === "dark";

  return (
    <div
      className={`${
        isFixed ? "fixed top-0 left-0 z-50 " : ""
      } max-h-[72px] w-full flex items-center justify-center drop-shadow py-4
      bg-light-overlay dark:bg-dark-overlay border-b-2
      border-b-light-border dark:border-b-[#F1E6FD30] transition-theme`}
    >
      <Container>
        <header className="flex w-full items-center justify-between px-4 mx-auto">
          <div className="flex gap-4 items-center">
            <Link to="/" className="flex items-center gap-4">
              <img
                src={logoImg}
                alt="Logo do site"
                // aplicar modo dark e light invertendo as cores
                className="hidden sm:block invert dark:invert-0 transition-theme"
              />
              <img
                src={logoImgMobile}
                alt="Logo do site"
                className="block sm:hidden invert dark:invert-0 transition-theme"
              />
            <h4 className="text-light-text dark:text-dark-text text-2xl font-semibold transition-theme">
              Movies
            </h4>
            </Link>
          </div>
          <div className="flex gap-4 items-center">
            <Button
              text={
                isDarkTheme ? (
                  <img
                    src={sunIcon}
                    alt="Tema claro"
                    className="w-6 h-6 invert"
                  />
                ) : (
                  <img src={moonIcon} alt="Tema escuro" className="w-6 h-6" />
                )
              }
              variant="secondary"
              onClick={toggleTheme}
              aria-label={`Mudar para tema ${isDarkTheme ? "claro" : "escuro"}`}
            />
            <Button text="Logout" onClick={handleSignOut} />
          </div>
        </header>
      </Container>
    </div>
  );
}
