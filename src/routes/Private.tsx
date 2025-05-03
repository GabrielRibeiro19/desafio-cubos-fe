import { ReactNode } from 'react'
// import { AuthContext } from '../contexts/AuthContext'

interface PrivateProps {
  children: ReactNode
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Private({ children }: PrivateProps) {
  // const { signed, loadingAuth } = useContext(AuthContext)

  // if (loadingAuth) {
  //   return <div>Carregando...</div>
  // }

  // if (!signed) {
  //   return <Navigate to="/login" />
  // }

  return children
}
