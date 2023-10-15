'use client'
import React, { useContext, useState } from 'react'
import styles from './movieDetailPage.module.scss'
import { Button } from '@/components/Button/Button'
import { CheckRounded, PlaylistAdd, PlaylistRemove } from '@mui/icons-material'
import { IconButton, Tooltip } from '@mui/material'
import { SessionContext } from '@/providers/SessionProvider'
import buttonStyles from '@/components/Button/Button.module.scss'

interface MovieActionButtonProps {
  movieID: number
  watched: boolean
  listed: boolean
}

export const MovieActionButtons: React.FC<MovieActionButtonProps> = ({ movieID, watched, listed }) => {
  const [loading, setLoading] = useState(false)
  const [isWatched, setIsWatched] = useState(watched)
  const [isListed, setIsListed] = useState(listed)

  const { user } = useContext(SessionContext)

  const markAsWatched = (): void => {
    setLoading(true)
    void fetch('http://localhost:8000/users/me/watched/', {
      method: 'POST',
      headers: {
        'User-Cookie': user.accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movie_id: movieID
      })
    }).then((res) => {
      if (res.status === 200) {
        setIsWatched(true)
      }
    }).finally(() => {
      setLoading(false)
    })
  }

  const unmarkAsWatched = (): void => {
    setLoading(true)
    void fetch('http://localhost:8000/users/me/watched/', {
      method: 'POST',
      headers: {
        'User-Cookie': user.accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movie_id: movieID
      })
    }).then((res) => {
      if (res.status === 200) {
        setIsWatched(false)
      }
    }).finally(() => {
      setLoading(false)
    })
  }

  const addToList = (): void => {
    setLoading(true)
    void fetch('http://localhost:8000/users/me/list/', {
      method: 'POST',
      headers: {
        'User-Cookie': user.accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movie_id: movieID
      })
    }).then((res) => {
      if (res.status === 200) {
        setIsListed(true)
      }
    }).finally(() => {
      setLoading(false)
    })
  }
  const removeFromList = (): void => {
    setLoading(true)
    void fetch('http://localhost:8000/users/me/list/', {
      method: 'POST',
      headers: {
        'User-Cookie': user.accessToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        movie_id: movieID
      })
    }).then((res) => {
      if (res.status === 200) {
        setIsListed(false)
      }
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
      <div className={styles.buttons}>
          {
            isWatched
              ? <Button loading={loading} onClick={unmarkAsWatched} variant={'secondary'}>Watched <CheckRounded sx={{ marginTop: 'auto' }}/></Button>
              : <Button loading={loading} onClick={markAsWatched} >Mark as Watched</Button>
          }
          { isListed
            ? <Tooltip title={'Remove From List'}>
                <IconButton className={buttonStyles.minimal} onClick={removeFromList} >
                    <PlaylistRemove sx={{ fontSize: '2rem' }}/>
                </IconButton>
            </Tooltip>
            : <Tooltip title={'Add to List'}>
                <IconButton className={buttonStyles.minimal} onClick={addToList} >
                    <PlaylistAdd sx={{ fontSize: '2rem' }}/>
                </IconButton>
            </Tooltip>}

      </div>

  )
}
