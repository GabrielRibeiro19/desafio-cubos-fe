import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContex";

export function useHeader() {
  const { signOut } = useContext(AuthContext);
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsFixed(window.scrollY > 70);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSignOut() {
    signOut();
  }

  return {
    isFixed,
    handleSignOut,
  };
}
