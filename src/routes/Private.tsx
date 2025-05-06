import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContex'

interface PrivateProps {
  children: ReactNode
}

export function Private({ children }: PrivateProps) {
  const { isAuthenticated, authChecked } = useContext(AuthContext)

  if (!authChecked) {
    return (
      <div className="w-full h-[calc(100vh-188px)] flex justify-center items-center">
        <div className="animate-pulse text-light-muted dark:text-dark-muted text-xl">
          Carregando...
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />
  }

  return children
}
