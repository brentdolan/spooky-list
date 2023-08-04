'use client'
import React from 'react'
import { Title } from '@/components/Title/Title'
import { NavBar } from '@/components/NavBar/NavBar'
import { HeroSection } from '@/components/HeroSection/HeroSection'

const DashboardPage = (): JSX.Element => {
  return (
      <div data-testid={'dashboard'}>
          <NavBar currentPage={'Dashboard'} />
          <Title text={'Dashboard'} />
          <HeroSection
              headerText={"What's your favorite scary movie?"}
              bodyText={'Lorem ipsum dolor sit amet consectetur. Justo dignissim neque id duis purus amet at ullamcorper phasellus.'}
              image={'/sillyGhosts.png'}
              altText={'Two Cartoon Ghosts'}
              isFlipped={false}
          />
      </div>
  )
}

export default DashboardPage
