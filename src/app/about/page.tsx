import React from 'react'
import { NavBar } from '@/components/NavBar/NavBar'
import { SessionProvider } from '@/providers/SessionProvider'
import { useSession } from '@/hooks/useSession'

const Page: React.FC = async () => {
  const { hasSession, user } = await useSession()
  return (
      <SessionProvider user={user} hasSession={hasSession}>
          <div data-testid={'about'}>
              <NavBar currentPage={'About'} />
          </div>
      </SessionProvider>

  )
}

export default Page
