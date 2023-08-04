import React from 'react'
import { render, screen } from '@testing-library/react'
import { HeroSection } from '@/components/HeroSection/HeroSection'

describe('HeroSection', () => {
  it('renders', () => {
    render(<HeroSection headerText={''} bodyText={''} image={''} altText={''} isFlipped={false}/>)
    expect(screen.getByTestId('hero-section')).toBeVisible()
  })
})
