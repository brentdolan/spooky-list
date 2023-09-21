import React from 'react'
import { NavBar } from '@/components/NavBar/NavBar'
import { HeroSection } from '@/components/HeroSection/HeroSection'
import { CardList } from '@/components/CardList/CardList'
import { MovieList } from '@/components/MovieList/MovieList'
import { useSession } from '@/hooks/useSession'
import { SessionProvider } from '@/providers/SessionProvider'

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
const LandingPage = async (): Promise<JSX.Element> => {
  const { hasSession, user } = await useSession()

  return (
      <SessionProvider hasSession={hasSession} user={user}>
          <div data-testid={'landing-page'}>
              <NavBar currentPage={'/'} />
              <HeroSection
                  headerText={'What\'s your favorite scary movie?'}
                  bodyText={'Lorem ipsum dolor sit amet consectetur. Justo dignissim neque id duis purus amet at ullamcorper phasellus.'}
                  image={'/ghostface.svg'}
                  altText={'Two Cartoon Ghosts'}
                  isFlipped={false}
              />
              <CardList />
              <MovieList title={'Most Popular'} initialMovieList={movies} />
              <MovieList title={'Family Frights'} initialMovieList={movies} />
          </div>
      </SessionProvider>
  )
}

export default LandingPage
