'use client'
import React from 'react'
import { NavBar } from '@/components/NavBar/NavBar'
import { HeroSection } from '@/components/HeroSection/HeroSection'
import { CardList } from '@/components/CardList/CardList'
import { MovieList } from '@/components/MovieList/MovieList'

const movies = [
  {
    id: 2,
    title: 'Jeepers Creepers',
    poster: 'https://m.media-amazon.com/images/I/61XjzSQGmcL._AC_UF894,1000_QL80_.jpg'
  }, {
    id: 3,
    title: 'Scream',
    poster: 'https://flxt.tmsimg.com/assets/p18852_p_v10_al.jpg'
  },
  {
    id: 5,
    title: 'Jeepers Creepers',
    poster: 'https://m.media-amazon.com/images/I/61XjzSQGmcL._AC_UF894,1000_QL80_.jpg'
  }, {
    id: 8,
    title: 'Scream',
    poster: 'https://flxt.tmsimg.com/assets/p18852_p_v10_al.jpg'
  },
  {
    id: 22,
    title: 'Jeepers Creepers',
    poster: 'https://m.media-amazon.com/images/I/61XjzSQGmcL._AC_UF894,1000_QL80_.jpg'
  }, {
    id: 34,
    title: 'Scream',
    poster: 'https://flxt.tmsimg.com/assets/p18852_p_v10_al.jpg'
  }
]

const LandingPage = (): JSX.Element => {
  return (
      <div data-testid={'landing-page'}>
          <NavBar currentPage={'/'} />
          <HeroSection
              headerText={"What's your favorite scary movie?"}
              bodyText={'Lorem ipsum dolor sit amet consectetur. Justo dignissim neque id duis purus amet at ullamcorper phasellus.'}
              image={'/ghostface.svg'}
              altText={'Two Cartoon Ghosts'}
              isFlipped={false}
          />
          <CardList />
          <MovieList title={'Most Popular'} movieList={movies} />
          <MovieList title={'Family Frights'} movieList={movies} />
      </div>
  )
}

export default LandingPage
