// import { FiLogIn, FiUser } from 'react-icons/fi'
// import { useContext } from 'react'
// import { AuthContext } from '../../contexts/AuthContext'

export function Footer() {
  // const { signed, loadingAuth } = useContext(AuthContext)

  return (
    <footer className="w-full flex items-center justify-center h-[68px] bg-[#12111380] drop-shadow py-4 border-t-2 border-t-[#F1E6FD30]">
      <h4 className="text-[#B5B2BC]">
        2025 © Todos os direitos reservados a{" "}
        <span className="font-bold">Cubos Movies</span>
      </h4>
    </footer>
  );
}
