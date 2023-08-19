import React from 'react'
import styles from './HeroSection.module.scss'
import { Button } from '@/components/Button/Button'
interface HeroSectionProps {
  headerText: string
  bodyText: string
  image: string
  altText: string
  isFlipped: boolean
}

export const HeroSection = ({ headerText, bodyText, image, altText, isFlipped }: HeroSectionProps): JSX.Element => {
  return (
      <div data-testid={'hero-section'} className={`${styles.heroSection} ${isFlipped ? styles.flipped : ''}`}>
          <h2>{headerText}</h2>
          <div className={styles.bodyText}>{bodyText}</div>
          <Button onClick={() => {}}>Start Watching</Button>
          <div className={styles.imageContainer}>
              <img alt={altText} src={image}/>
          </div>
      </div>
  )
}
