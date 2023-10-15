import React from 'react'
import { NavBar } from '@/components/NavBar/NavBar'
import { HeroSection } from '@/components/HeroSection/HeroSection'
import { CardList } from '@/components/CardList/CardList'
import { MovieList } from '@/components/MovieList/MovieList'
import { useSession } from '@/hooks/useSession'
import { SessionProvider } from '@/providers/SessionProvider'

interface MovieCardData {
  id: number
  title: string
  poster: string
}

interface Homefeed {
  mostPopular: MovieCardData[]
  familyFrights: MovieCardData[]
  deepCuts: MovieCardData[]
}

const homefeed: Homefeed = {
  mostPopular: [
    {
      id: 29,
      title: 'The Conjuring',
      poster: 'https://m.media-amazon.com/images/M/MV5BMTM3NjA1NDMyMV5BMl5BanBnXkFtZTcwMDQzNDMzOQ@@._V1_.jpg'
    },
    {
      id: 46,
      title: 'The Exorcist: Believer',
      poster: 'https://m.media-amazon.com/images/M/MV5BMzVjZWUzNDUtZTQxMi00N2QzLWJjMzQtZTc4ZTU2YWEzNDA3XkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_.jpg'
    },
    {
      id: 73,
      title: 'Halloween',
      poster: 'https://m.media-amazon.com/images/M/MV5BNzk1OGU2NmMtNTdhZC00NjdlLWE5YTMtZTQ0MGExZTQzOGQyXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg'
    },
    {
      id: 88,
      title: 'Hereditary',
      poster: 'https://m.media-amazon.com/images/M/MV5BOTU5MDg3OGItZWQ1Ny00ZGVmLTg2YTUtMzBkYzQ1YWIwZjlhXkEyXkFqcGdeQXVyNTAzMTY4MDA@._V1_.jpg'
    },
    {
      id: 125,
      title: 'The Nightmare Before Christmas',
      poster: 'https://m.media-amazon.com/images/M/MV5BNWE4OTNiM2ItMjY4Ni00ZTViLWFiZmEtZGEyNGY2ZmNlMzIyXkEyXkFqcGdeQXVyMDU5NDcxNw@@._V1_.jpg'
    },
    {
      id: 155,
      title: 'Scream',
      poster: 'https://m.media-amazon.com/images/M/MV5BMjA2NjU5MTg5OF5BMl5BanBnXkFtZTgwOTkyMzQxMDE@._V1_.jpg'
    }
  ],
  familyFrights: [
    {
      id: 2,
      title: 'The Addams Family',
      poster: 'https://m.media-amazon.com/images/M/MV5BMmJhZTlhNzUtNzAwZC00YjQ2LTkxOGEtNzBmOWVkMmUxNTBiXkEyXkFqcGdeQXVyMTExNDQ2MTI@._V1_.jpg'
    },
    {
      id: 13,
      title: 'Beetle Juice',
      poster: 'https://m.media-amazon.com/images/M/MV5BZDdmNjBlYTctNWU0MC00ODQxLWEzNDQtZGY1NmRhYjNmNDczXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg'
    },
    {
      id: 67,
      title: 'Ghostbusters',
      poster: 'https://m.media-amazon.com/images/M/MV5BMTkxMjYyNzgwMl5BMl5BanBnXkFtZTgwMTE3MjYyMTE@._V1_.jpg'
    },
    {
      id: 80,
      title: 'Halloweentown',
      poster: 'https://m.media-amazon.com/images/M/MV5BOTAyYjQ3NjctNGMzNi00YThkLThmYzUtZDViYWZkMDA2YTMyL2ltYWdlL2ltYWdlXkEyXkFqcGdeQXVyNjAwMjc0NjQ@._V1_.jpg'
    },
    {
      id: 91,
      title: 'Hocus Pocus',
      poster: 'https://m.media-amazon.com/images/M/MV5BNWM3NmRhMGMtOGE4ZC00MDk0LWI1NjMtMjVlNTEwOTcwZTc0XkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg'
    },
    {
      id: 121,
      title: 'Haunted Mansion',
      poster: 'https://m.media-amazon.com/images/M/MV5BNTlmZmFkYTEtMDM4NS00NTgzLWFhODEtZjMxOTlmN2QxZTdiXkEyXkFqcGdeQXVyMTMzOTQyOTk1._V1_.jpg'
    }
  ],
  deepCuts: [
    {
      id: 19,
      title: 'The Cabin in the Woods',
      poster: 'https://m.media-amazon.com/images/M/MV5BNTUxNzYyMjg2N15BMl5BanBnXkFtZTcwMTExNzExNw@@._V1_.jpg'
    },
    {
      id: 85,
      title: 'Hell House LLC',
      poster: 'https://m.media-amazon.com/images/M/MV5BNGZlMmE5MjctMjFhOC00Mjk4LTkwYTctODhiZjcyYmU3OTU3XkEyXkFqcGdeQXVyNTcwMzkyNDE@._V1_.jpg'
    },
    {
      id: 109,
      title: 'The Last Exorcism',
      poster: 'https://m.media-amazon.com/images/M/MV5BNDc4Mjk2MjA0NF5BMl5BanBnXkFtZTcwMzMyNjQ3Mw@@._V1_.jpg'
    },
    {
      id: 128,
      title: 'Oculus',
      poster: 'https://m.media-amazon.com/images/M/MV5BMzE1NzM4MjEyNV5BMl5BanBnXkFtZTgwMjYzMjMzMTE@._V1_.jpg'
    },
    {
      id: 171,
      title: 'The Taking',
      poster: 'https://m.media-amazon.com/images/M/MV5BZWQ3YmU4ZjYtZGE2Ni00NjhiLTk2NTMtYmVmYmNkNWViYzUxXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg'
    },
    {
      id: 172,
      title: 'Tales of Halloween',
      poster: 'https://m.media-amazon.com/images/M/MV5BMjQwODQ1MTM1MF5BMl5BanBnXkFtZTgwODUwNzY5NjE@._V1_.jpg'
    }
  ]
}

const LandingPage: React.FC = async () => {
  const { hasSession, user } = await useSession()

  return (
      <SessionProvider hasSession={hasSession} user={user}>
          <div data-testid={'landing-page'}>
              <NavBar currentPage={'/'} />
              <HeroSection
                  headerText={'What\'s your favorite scary movie?'}
                  bodyText={'An evolving catalog of movies involving all things creepy, scary, and frightening! A website dedicated to fans of all things spooky and lovers of horror movies.'}
                  image={'/ghostface.svg'}
                  altText={'A cartoon illustration of the classic horror villain Ghostface'}
                  isFlipped={false}
                  buttonText={'Start Watching'}
                  redirectTo={'/catalog'}
              />
              <CardList />
              <MovieList showButton={false} title={'Most Popular'} initialMovieList={homefeed.mostPopular} />
              <MovieList showButton={false} title={'Family Frights'} initialMovieList={homefeed.familyFrights} />
              <MovieList showButton={false} title={'Deep Cuts'} initialMovieList={homefeed.deepCuts} />
              <HeroSection
                  headerText={'Discover your inner final girl.'}
                  bodyText={'Browse our collection of ghastly films including modern horror, slashers, paranormal, thrillers, found footage, and more!'}
                  image={'/michael_myers.svg'}
                  altText={'A cartoon illustration of the classic horror villain Michael Myers'}
                  isFlipped
                  buttonText={'Start Watching'}
                  redirectTo={'/catalog'}
              />
          </div>
      </SessionProvider>
  )
}

export default LandingPage
