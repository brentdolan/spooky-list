import React from 'react'
import styles from './MovieList.module.scss'

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
      <div data-testid={'movie-list'} >
          <h3 data-testid={'movie-list-title'} className={styles.listTitle} >
              {title}
          </h3>
          <div className={styles.movieList}>
              {movieList.map(movie => (
                  <div className={styles.imageContainer} data-testid={`movie-${movie.title}`} key={movie.id}>
                      <img alt={movie.title} src={movie.poster}/>
                  </div>
              ))}
          </div>
      </div>
  )
}
