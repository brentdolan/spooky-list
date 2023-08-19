'use client'
import React from 'react'
import { NavBar } from '@/components/NavBar/NavBar'
import styles from './movieDetailPage.module.scss'
import { Button } from '@/components/Button/Button'
import { BookmarkOutlined, PlaylistAdd } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'

const movie = {
  url: 'http://localhost:8000/movies/5/',
  id: 5,
  title: 'Alvin and the Chipmunks Meet the Wolfman',
  description: 'When Alvin discovers that his neighbor is a werewolf, he begins an exhilarating race against time before the full moon arrives. But the real terror will come when Theodore starts acting weird too.',
  release_date: '2000-08-29',
  rating: 'R',
  length_minutes: 77,
  poster: 'https://m.media-amazon.com/images/M/MV5BMzM1N2I1NzktMjBlYi00OGFkLTg5N2YtMjJmZDExNGM3NTA5XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
  amazon_link: '',
  trigger_warning: '',
  where_to_watch: [],
  genres: ['Body Horror', 'Burlesque'],
  cast_and_crew: []
}
const Page: React.FC = () => {
  return (
      <div data-testid={'movies-details'}>
          <NavBar currentPage={'Catalog'} />
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
                  <div className={styles.buttons}>
                      <Button variant={'secondary'} onClick={() => {}}>Mark as Watched</Button>
                      <Tooltip title={'Bookmark'}>
                          <IconButton>
                              <BookmarkOutlined sx={{ fontSize: '2rem' }}/>
                          </IconButton>
                      </Tooltip>
                      <Tooltip title={'Add to List'}>
                          <IconButton>
                              <PlaylistAdd sx={{ fontSize: '2rem' }}/>
                          </IconButton>
                      </Tooltip>
                  </div>

                  <p>{movie.description}</p>
              </div>
          </div>
      </div>
  )
}

export default Page
