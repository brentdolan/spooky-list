import React from 'react'
import styles from './CardList.module.scss'
import { Card } from '@/components/Card/Card'

export const CardList: React.FC = () => {
  const cards = [
    { headerText: 'Where to Watch', bodyText: 'Don’t waste time searching for where to watch your favorite movie. Our catalog includes a list of streaming services for each film.' },
    { headerText: 'Customizable', bodyText: 'Have you ever wanted to curate your own Halloween watchlist? Build your own list as you countdown to the best day of the year.' },
    { headerText: 'Family Friendly', bodyText: 'Not all spooky movies have to be scary! Our catalog has plenty of options for viewers of all ages, so grab some popcorn and watch!' }
  ]

  return (
      <div className={styles.cardList}>
          {cards.map(card => (
              <Card key={card.headerText} headerText={card.headerText} bodyText={card.bodyText}/>)
          )}
      </div>
  )
}
