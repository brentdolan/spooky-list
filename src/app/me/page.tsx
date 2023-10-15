import React, { type ReactNode } from 'react'
import { useSession } from '@/hooks/useSession'
import { SessionProvider } from '@/providers/SessionProvider'
import { NavBar } from '@/components/NavBar/NavBar'
import { SecondaryNav } from '@/components/SecondaryNav/SecondaryNav'
import { MovieList } from '@/components/MovieList/MovieList'
import { getProfile } from '@/helpers/fetch'
import { Table } from '@/components/Table/Table'

const ProfilePage: React.FC = async () => {
  const { hasSession, user } = await useSession()
  const profile = await getProfile(user.accessToken)

  const headers = [
    { field: 'title', headerName: 'Movie Title' },
    { field: 'date_watched', headerName: 'Watched On' }
  ]

  const tabs: Array<{
    title: string
    component: ReactNode
  }> = [
    { title: 'Watch List', component: <MovieList showButton={false} title={''} initialMovieList={profile.watch_list}/> },
    { title: 'History', component: <Table headers={headers} rows={profile.watch_history}/> }
  ]

  return (
      <SessionProvider hasSession={hasSession} user={user}>
          <NavBar currentPage={'/'}/>
          <div>
              <SecondaryNav tabs={tabs} initialTabName={'Watch List'}/>
          </div>
      </SessionProvider>
  )
}

export default ProfilePage
