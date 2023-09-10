import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export interface User {
  firstName: string
  lastName: string
  id: string
}

export interface UseSessionResponse {
  hasSession: boolean
  user: User
}

/** useSession is a server-side hook which fetches the user's session from Supabase and returns a simplified view.
 *
 * @remarks
 * ***Only for use in server-side Components. If you need to get the session is a client-side component,
 * use SessionProvider.***
 *
 * @returns UseSessionResponse */
export const useSession = async (): Promise<UseSessionResponse> => {
  // Connect to supabase
  const supabase = createServerActionClient({ cookies })
  // Get session from supabase
  const { data: { session } } = await supabase.auth.getSession()

  // Create our own auth object
  const authResponse = {
    hasSession: false,
    user: {
      firstName: '',
      lastName: '',
      id: ''
    }
  }

  // If there's no session, return empty object
  if (session == null) {
    return authResponse
  }

  // Fill out the AuthResponse object
  authResponse.user.id = session.user.id
  authResponse.hasSession = true

  // If email, then they provided their name for us
  if (session.user.app_metadata.provider === 'email') {
    authResponse.user.firstName = session.user.user_metadata.firstName
    authResponse.user.lastName = session.user.user_metadata.lastName
    return authResponse
  }

  // If a different provider, we have to pull it from the user full name
  const userFullName = session?.user?.user_metadata?.full_name.split(' ')

  if (userFullName.length > 0) {
    authResponse.user.firstName = userFullName.slice(0, -1).join(' ')
    authResponse.user.lastName = userFullName[userFullName.length - 1]
  }

  return authResponse
}
