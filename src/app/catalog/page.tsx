import React from 'react'
import { NavBar } from '@/components/NavBar/NavBar'
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

const Page: React.FC = async () => {
  const movies = await getMovies(1)

  return (
      <div data-testid={'catalog'}>
          <NavBar currentPage={'Catalog'} />
          <MovieList initialMovieList={movies.results} title={'All Movies'}/>
      </div>
  )
}
export default Page
