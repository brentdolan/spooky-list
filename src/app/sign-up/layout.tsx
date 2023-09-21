import React, { Suspense } from 'react'
import MovieDetailSkeleton from '@/app/catalog/[id]/loading'
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
          <Suspense fallback={<MovieDetailSkeleton/>}>
              <NavBar currentPage={'/'}/>
              {/* Children of Layout is Page */}
              {children}
          </Suspense>
      </SessionProvider>
  )
}

export default RootLayout
