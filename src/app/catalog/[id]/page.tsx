import React from 'react'
import styles from './movieDetailPage.module.scss'
import { type GetMovieResponse } from '@/app/catalog/page'
import { MovieList } from '@/components/MovieList/MovieList'
import { MovieActionButtons } from '@/app/catalog/[id]/MovieActionButtons'

const getMovie = async (id: string): Promise<GetMovieResponse> => {
  const response = await fetch(`http://host.docker.internal:8000/movies/${id}`)

  return await response.json()
}

interface MovieDetailProps {
  params: {
    id: string
  }
}

const Page: React.FC<MovieDetailProps> = async ({ params }) => {
  const id = params.id
  const movie = await getMovie(id)

  return (
      <div data-testid={'movies-details'}>
          <div className={styles.details}>
              <img className={styles.poster} title={movie.title} alt={`Movie poster for ${movie.title}`} src={movie.poster} />
              <div className={styles.movieInfo}>
                  <h1>{movie.title}</h1>
                  <div className={styles.metadataContainer} >
                      <span><strong>Genres:</strong> {movie.genres.join(', ')} </span>
                      <div className={styles.metadata}>
                          <span><strong>Rating:</strong> {movie.rating}</span>
                          <span><strong>Year:</strong> {movie.release_date.split('-')[0]}</span>
                          <span><strong>Runtime:</strong> {movie.length_minutes} minutes</span>
                      </div>
                  </div>
                  <MovieActionButtons movieID={movie.id}/>
                  <p>{movie.description}</p>
              </div>
          </div>
          <MovieList title={'Other Recommendations'} initialMovieList={movie.other_recommendations}/>
      </div>
  )
}

export default Page
