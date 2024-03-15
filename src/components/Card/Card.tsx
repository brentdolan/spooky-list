import React from 'react'
import styles from './Card.module.scss'

interface CardProps {
  headerText: string
  bodyText: string
}

export const Card: React.FC<CardProps> = ({ headerText, bodyText }) => {
  return (
      <div className={styles.card}>
          <h3>
              {headerText}
          </h3>
          <p>
              {bodyText}
          </p>
      </div>
  )
}
