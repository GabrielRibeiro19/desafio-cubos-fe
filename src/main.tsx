import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { router } from './App.tsx'
import './index.css'
import "react-circular-progressbar/dist/styles.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Toaster position="bottom-right" reverseOrder={false} />
      <RouterProvider router={router} />
  </StrictMode>,
)
