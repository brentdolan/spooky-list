'use client'
import React, { useContext } from 'react'
import styles from './movieDetailPage.module.scss'
import { Button } from '@/components/Button/Button'
import { PlaylistAdd } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { SessionContext } from '@/providers/SessionProvider'

interface MovieActionButtonProps {
  movieID: number
}

export const MovieActionButtons: React.FC<MovieActionButtonProps> = ({ movieID }) => {
  const { user } = useContext(SessionContext)

  const markAsWatched = (): void => {
    void fetch('http://localhost:8000/users/me/watched/', {
      method: 'POST',
      headers: {
        'User-Cookie': user.accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movie_id: movieID
      })
    })
  }

  const addToList = (): void => {
    void fetch('http://localhost:8000/users/me/list/', {
      method: 'POST',
      headers: {
        'User-Cookie': user.accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movie_id: movieID
      })
    })
  }

  return (
      <div className={styles.buttons}>
          <Button onClick={markAsWatched} variant={'secondary'}>Mark as Watched</Button>
          <Tooltip title={'Add to List'}>
              <IconButton onClick={addToList} >
                  <PlaylistAdd sx={{ fontSize: '2rem' }}/>
              </IconButton>
          </Tooltip>
      </div>

  )
}
