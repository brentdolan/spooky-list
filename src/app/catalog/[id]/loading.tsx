import React from 'react'
import { Skeleton } from '@mui/material'
import styles from '@/app/catalog/[id]/movieDetailPage.module.scss'

const MovieDetailSkeleton: React.FC = () => {
  return (
      <div data-testid={'movies-details'}>
          <div className={styles.details}>
              <Skeleton variant={'rounded'} sx={{
                bgcolor: 'grey.800',
                height: '100%'
              }}
              />
              <div className={styles.movieInfo}>
                  <Skeleton variant={'text'} sx={{
                    bgcolor: 'grey.800',
                    fontSize: '4rem',
                    marginBottom: '2rem',
                    width: '75%'
                  }}
                  />
                  <div className={styles.metadataContainer} >
                      <Skeleton variant={'text'} sx={{
                        bgcolor: 'grey.800',
                        fontSize: '1.5rem',
                        width: '50%'
                      }}
                      />
                  </div>
                  <Skeleton variant={'text'} sx={{
                    bgcolor: 'grey.800',
                    fontSize: '1.5rem',
                    marginBottom: '2rem',
                    width: '50%'
                  }}
                  />
                  <div>
                      <Skeleton variant={'text'} sx={{
                        bgcolor: 'grey.800',
                        fontSize: '2.5rem'
                      }}
                      />
                      <Skeleton variant={'text'} sx={{
                        bgcolor: 'grey.800',
                        fontSize: '2.5rem'
                      }}
                      />
                      <Skeleton variant={'text'} sx={{
                        bgcolor: 'grey.800',
                        fontSize: '2.5rem'
                      }}
                      />
                      <Skeleton variant={'text'} sx={{
                        bgcolor: 'grey.800',
                        fontSize: '2.5rem'
                      }}
                      />
                      <Skeleton variant={'text'} sx={{
                        bgcolor: 'grey.800',
                        fontSize: '2.5rem'
                      }}
                      />
                  </div>

              </div>
          </div>
      </div>
  )
}
export default MovieDetailSkeleton
