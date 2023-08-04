import React from 'react'
import styles from './Title.module.scss'

interface TitleProps {
  text: string
}
export const Title = ({ text }: TitleProps): JSX.Element => {
  return (
      <h1 data-testid="title" className={styles.title}>
          {text}
      </h1>
  )
}
