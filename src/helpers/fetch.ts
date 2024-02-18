import { type GetMovieResponse, type GetMoviesResponse } from '@/app/catalog/page'

export const NEXT_PUBLIC_SERVER_SIDE_BACKEND_URL = process.env.NEXT_PUBLIC_SERVER_SIDE_BACKEND_URL ?? ''
export const NEXT_PUBLIC_CLIENT_SIDE_BACKEND_URL = process.env.NEXT_PUBLIC_CLIENT_SIDE_BACKEND_URL ?? ''

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
    const response = await fetch(`${NEXT_PUBLIC_SERVER_SIDE_BACKEND_URL}/movies?page=${page}`, { headers })
    return await response.json()
  } else {
    const response = await fetch(`${NEXT_PUBLIC_SERVER_SIDE_BACKEND_URL}/movies?page=${page}`, { headers })
    return await response.json()
  }
}

export const getProfile = async (cookie: string): Promise<GetProfileResponse> => {
  const profileHeaders = {
    ...headers,
    'User-Cookie': cookie
  }
  const response = await fetch(`${NEXT_PUBLIC_SERVER_SIDE_BACKEND_URL}/users/me/profile`, { headers: profileHeaders })
  return await response.json()
}
