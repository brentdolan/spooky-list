import React from 'react'
import { NavBar } from '@/components/NavBar/NavBar'
import { useSession } from '@/hooks/useSession'
import { SessionProvider } from '@/providers/SessionProvider'
interface LayoutProps {
  children?: React.ReactNode
}

const RootLayout: React.FC<LayoutProps> = async ({ children }) => {
  const { hasSession, user } = await useSession()
  return (
      <SessionProvider hasSession={hasSession} user={user}>
              <NavBar currentPage={'/'}/>
              {/* Children of Layout is Page */}
              {children}
      </SessionProvider>
  )
}

export default RootLayout
