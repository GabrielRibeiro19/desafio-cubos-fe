// src/routes/Private.tsx
import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContex'

interface PrivateProps {
  children: ReactNode
}

export function Private({ children }: PrivateProps) {
  const { isAuthenticated, authChecked } = useContext(AuthContext)

  // Se a verificação de autenticação ainda não foi concluída, mostramos um indicador de carregamento
  if (!authChecked) {
    return (
      <div className="w-full h-[calc(100vh-188px)] flex justify-center items-center">
        <div className="animate-pulse text-light-muted dark:text-dark-muted text-xl">
          Carregando...
        </div>
      </div>
    )
  }

  // Só redirecionamos para a página de login se a verificação de autenticação foi concluída
  // e o usuário não está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return children
}