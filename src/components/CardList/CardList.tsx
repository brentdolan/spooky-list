import React from 'react'
import styles from './CardList.module.scss'
import { Card } from '@/components/Card/Card'

export const CardList: React.FC = () => {
  const cards = [
    { headerText: 'Where to Watch', bodyText: 'Lorem ipsum dolor sit amet consectetur. Eget lacinia sed orci scelerisque vulputate ornare volutpat id.' },
    { headerText: 'Customizable', bodyText: 'Lorem ipsum dolor sit amet consectetur. Eget lacinia sed orci scelerisque vulputate ornare volutpat id.' },
    { headerText: 'Family Friendly', bodyText: 'Lorem ipsum dolor sit amet consectetur. Eget lacinia sed orci scelerisque vulputate ornare volutpat id.' }
  ]

  return (
      <div className={styles.cardList}>
          {cards.map(card => (
              <Card key={card.headerText} headerText={card.headerText} bodyText={card.bodyText}/>)
          )}
      </div>
  )
}
