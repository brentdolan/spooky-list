'use client'
import React from 'react'
import { NavBar } from '@/components/NavBar/NavBar'
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

const genreLists = [
  {
    name: 'Popular',
    movies
  },
  {
    name: 'Family Frights',
    movies
  },
  {
    name: 'Thrillers',
    movies
  }

]

const Page = (): JSX.Element => {
  return (
      <div data-testid={'catalog'}>
          <NavBar currentPage={'Catalog'} />
          {genreLists.map(genreList => (
              <MovieList title={genreList.name} movieList={genreList.movies} key={genreList.name}/>
          )
          )}
      </div>
  )
}
export default Page
