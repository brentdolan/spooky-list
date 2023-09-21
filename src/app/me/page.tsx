import React from 'react'
import { useSession } from '@/hooks/useSession'
import { SessionProvider } from '@/providers/SessionProvider'
import { NavBar } from '@/components/NavBar/NavBar'

const ProfilePage: React.FC = async () => {
  const { hasSession, user } = await useSession()
  return (
      <SessionProvider hasSession={hasSession} user={user}>
          <NavBar currentPage={'/'}/>
          <div />
      </SessionProvider>
  )
}

export default ProfilePage
