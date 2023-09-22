import React, { type ReactNode } from 'react'
import { useSession } from '@/hooks/useSession'
import { SessionProvider } from '@/providers/SessionProvider'
import { NavBar } from '@/components/NavBar/NavBar'
import { SecondaryNav } from '@/components/SecondaryNav/SecondaryNav'
import { MovieList } from '@/components/MovieList/MovieList'
import { getMovies } from '@/helpers/fetch'

export interface GetMovieResponse {
  url: string
  id: number
  title: string
  description: string
  release_date: string
  rating: string
  length_minutes: number
  poster: string
  amazon_link: string
  trigger_warning: string
  where_to_watch: string[]
  genres: string[]
  cast_and_crew: string[]
  other_recommendations: Array<{
    id: number
    title: string
    poster: string
  }>
}
export interface GetMoviesResponse {
  count: number
  next: string
  previous?: string
  results: GetMovieResponse[]
}

const ProfilePage: React.FC = async () => {
  const movies = await getMovies(1)
  const { hasSession, user } = await useSession()
  const tabs: Array<{
    title: string
    component: ReactNode
  }> = [
    { title: 'Watch List', component: <MovieList title={''} initialMovieList={movies.results}/> },
    { title: 'History', component: <MovieList title={''} initialMovieList={movies.results}/> }

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
