import { Outlet } from 'react-router-dom'
import { Background } from '../background'
import { Footer } from '../footer'
import { Header } from '../header'

export function Layout() {
  return (
    <>
      <Background />
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}
