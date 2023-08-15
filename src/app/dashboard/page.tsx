'use client'
import React from 'react'

const DashboardPage = (): JSX.Element => {
  return (
      <div data-testid={'dashboard'}>
          <NavBar currentPage={'Dashboard'} />
          <HeroSection
              headerText={"What's your favorite scary movie?"}
              bodyText={'Lorem ipsum dolor sit amet consectetur. Justo dignissim neque id duis purus amet at ullamcorper phasellus.'}
              image={'/ghostface.svg'}
              altText={'Two Cartoon Ghosts'}
              isFlipped={false}
          />
      </div>
  )
}

export default DashboardPage
