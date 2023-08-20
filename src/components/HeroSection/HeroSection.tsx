'use client'
import React from 'react'
import styles from './HeroSection.module.scss'
import { Button } from '@/components/Button/Button'
import Image from 'next/image'

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
              <Image alt={altText} src={image} style={{ width: '80%', height: 'auto' }} width={12} height={12}/>
          </div>
      </div>
  )
}
