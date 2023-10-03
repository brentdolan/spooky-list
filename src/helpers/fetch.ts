import { type GetMovieResponse, type GetMoviesResponse } from '@/app/catalog/page'

export interface GetProfileResponse {
  watch_history: GetMovieResponse[]
  watch_list: GetMovieResponse[]
  user_metadata: {
    first_name: string
    last_name: string
    email: string
  }
}

const headers = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}

export const getMovies = async (page: number): Promise<GetMoviesResponse> => {
  if (page === 1) {
    const response = await fetch(`http://host.docker.internal:8000/movies?page=${page}`, { headers })
    return await response.json()
  } else {
    const response = await fetch(`http://localhost:8000/movies?page=${page}`, { headers })
    return await response.json()
  }
}

export const getProfile = async (cookie: string): Promise<GetProfileResponse> => {
  const profileHeaders = {
    ...headers,
    'User-Cookie': cookie
  }
  const response = await fetch('http://host.docker.internal:8000/users/me/profile', { headers: profileHeaders })
  return await response.json()
}
