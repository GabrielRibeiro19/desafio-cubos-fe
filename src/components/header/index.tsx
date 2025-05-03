import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../../assets/Cubos Logo.svg";
import themeLightIcon from "../../assets/icons/Sun.svg";
import { Button } from "../button";
import logoImgMobile from "/favicon.svg";
// import { FiLogIn, FiUser } from 'react-icons/fi'
// import { useContext } from 'react'
// import { AuthContext } from '../../contexts/AuthContext'

export function Header() {
  // const { signed, loadingAuth } = useContext(AuthContext)

  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsFixed(window.scrollY > 70);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className={`${isFixed ? "fixed top-0 left-0 z-50 bg-[#121113e1] " : "bg-[#12111380] "} max-h-[72px] w-full flex items-center justify-center drop-shadow py-4 border-b-2 border-b-[#F1E6FD30] transition-all duration-300`}>
      <header className="flex w-full items-center justify-between px-4 mx-auto">
        <div className="flex gap-4 items-center">
          <Link to="/">
            <img src={logoImg} alt="Logo do site" className="hidden sm:block" />
            <img
              src={logoImgMobile}
              alt="Logo do site"
              className="block sm:hidden"
            />
          </Link>
          <h4 className="text-white text-2xl font-semibold">Movies</h4>
        </div>
        <div className="flex gap-4 items-center">
          <Button
          text={
            <img src={themeLightIcon} alt="icon" className="w-6 h-6" />
          }
          variant="secondary"
           />
          <Button text="Logout" />
        </div>
        {/* {!loadingAuth && signed && (
          <Link
            to="/dashboard"
            className="p-1 border-2 rounded-full border-gray-900"
          >
            <FiUser size={22} color="#000" />
          </Link>
        )}
        {!loadingAuth && !signed && (
          <Link
            to="/login"
            className="p-1 border-2 rounded-full border-gray-900"
          >
            <FiLogIn size={22} color="#000" />
          </Link> */}
        {/* )} */}
      </header>
    </div>
  );
}
