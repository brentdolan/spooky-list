import React from 'react'
import styles from './MovieList.module.scss'
import Link from 'next/link'

interface MovieListProps {
  title: string
  movieList: Array<{
    id: number
    title: string
    poster: string
  }>
}

export const MovieList: React.FC<MovieListProps> = ({ title, movieList }) => {
  return (
      <div data-testid={'movies-list'} >
          <h3 data-testid={'movies-list-title'} className={styles.listTitle} >
              {title}
          </h3>
          <div className={styles.movieList}>
              {movieList.map(movie => (
                  <div className={styles.imageContainer} data-testid={`movie-${movie.title}`} key={movie.id}>
                      <Link href={`/catalog/${movie.id}`}>
                          <img alt={movie.title} src={movie.poster}/>
                      </Link>
                  </div>
              ))}
          </div>
      </div>
  )
}
