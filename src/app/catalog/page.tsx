import React from 'react'
import { NavBar } from '@/components/NavBar/NavBar'
import { MovieList } from '@/components/MovieList/MovieList'

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
}
export interface GetMoviesResponse {
  count: number
  next: string
  previous?: string
  results: GetMovieResponse[]
}
const getMovies = async (): Promise<GetMoviesResponse> => {
  const response = await fetch('http://host.docker.internal:8000/movies')

  return await response.json()
}
const Page: React.FC = async () => {
  const movies = await getMovies()

  return (
      <div data-testid={'catalog'}>
          <NavBar currentPage={'Catalog'} />
          <MovieList movieList={movies.results} title={'All Movies'}/>
      </div>
  )
}
export default Page
