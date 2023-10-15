'use client'
import React from 'react'
import styles from './HeroSection.module.scss'
import { Button } from '@/components/Button/Button'
import Image from 'next/image'
import Link from 'next/link'

interface HeroSectionProps {
  headerText: string
  bodyText: string
  image: string
  altText: string
  isFlipped: boolean
  buttonText: string
  redirectTo: string
}

export const HeroSection = ({ headerText, bodyText, image, altText, isFlipped, buttonText, redirectTo }: HeroSectionProps): JSX.Element => {
  return (
      <div data-testid={'hero-section'} className={`${styles.heroSection} ${isFlipped ? styles.flipped : ''}`}>
          <h2>{headerText}</h2>
          <div className={styles.bodyText}>{bodyText}</div>
          <Link href={redirectTo}>
              <Button onClick={() => {}}>{buttonText}</Button>
          </Link>
          <div className={styles.imageContainer}>
              <Image alt={altText} src={image} style={{ width: '80%', height: 'auto' }} width={12} height={12}/>
          </div>
      </div>
  )
}
