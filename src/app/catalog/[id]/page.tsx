import React from 'react'
import { NavBar } from '@/components/NavBar/NavBar'
import styles from './movieDetailPage.module.scss'
// import { Button } from '@/components/Button/Button'
// import { BookmarkOutlined, PlaylistAdd } from '@mui/icons-material'
// import { IconButton, Tooltip } from '@mui/material'
import { type GetMovieResponse } from '@/app/catalog/page'

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
                  {/* <div className={styles.buttons}> */}
                  {/*    <Button variant={'secondary'}>Mark as Watched</Button> */}
                  {/*    <Tooltip title={'Bookmark'}> */}
                  {/*        <IconButton> */}
                  {/*            <BookmarkOutlined sx={{ fontSize: '2rem' }}/> */}
                  {/*        </IconButton> */}
                  {/*    </Tooltip> */}
                  {/*    <Tooltip title={'Add to List'}> */}
                  {/*        <IconButton> */}
                  {/*            <PlaylistAdd sx={{ fontSize: '2rem' }}/> */}
                  {/*        </IconButton> */}
                  {/*    </Tooltip> */}
                  {/* </div> */}

                  <p>{movie.description}</p>
              </div>
          </div>
      </div>
  )
}

export default Page
