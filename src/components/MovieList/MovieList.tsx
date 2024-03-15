'use client'
import React, { useState } from 'react'
import styles from './MovieList.module.scss'
import Link from 'next/link'
import { Button } from '@/components/Button/Button'
import { getMovies } from '@/helpers/fetch'

interface MovieListProps {
  title: string
  showButton?: boolean
  initialMovieList: Array<{
    id: number
    title: string
    poster: string
  }>
}

// Prop for Button to appear/not appear
const trimmedURL = (url: string): string => url.replace('_V1_', '_V1_UX197_CR0')

export const MovieList: React.FC<MovieListProps> = ({ title, initialMovieList, showButton = true }) => {
  const [page, setPage] = useState(1)
  const [movieList, setMovieList] = useState(initialMovieList)
  const onCLick = (): void => {
    void getMovies(page + 1).then((movieResponse) => {
      setMovieList([...movieList, ...movieResponse.results])
    })
    setPage(page + 1)
  }
  if (movieList.length === 0) {
    return <></>
  }
  return (
      <div data-testid={'movies-list'} >
          <h3 data-testid={'movies-list-title'} className={styles.listTitle} >
              {title}
          </h3>
          <div className={styles.movieList}>
              {movieList.map(movie => (
                  <div className={styles.imageContainer} data-testid={`movie-${movie.title}`} key={movie.id}>
                      <Link href={`/catalog/${movie.id}`}>
                          <img alt={movie.title} src={trimmedURL(movie.poster)}/>
                      </Link>
                  </div>
              ))}
          </div>
          <div className={styles.movieListButton}>
              {showButton ? <Button onClick={onCLick}>View More</Button> : null}
          </div>
      </div>
  )
}
