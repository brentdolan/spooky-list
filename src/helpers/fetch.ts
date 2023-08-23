import { type GetMoviesResponse } from '@/app/catalog/page'

export const getMovies = async (page: number): Promise<GetMoviesResponse> => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
  if (page === 1) {
    const response = await fetch(`http://host.docker.internal:8000/movies?page=${page}`, { headers })
    return await response.json()
  } else {
    const response = await fetch(`http://localhost:8000/movies?page=${page}`, { headers })
    return await response.json()
  }
}
