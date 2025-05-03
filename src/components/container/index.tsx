import { ReactNode } from 'react'

export function Container({ children }: { children: ReactNode }) {
  return <div className="w-full max-w-screen-2xl mx-auto px-4 my-6">{children}</div>
}
