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
  const supabase = createServerActionClient({ cookies })
  const { data: { session } } = await supabase.auth.getSession()
  const authResponse = {
    hasSession: false,
    user: {
      firstName: '',
      lastName: '',
      id: ''
    }
  }

  if (session == null) {
    return authResponse
  }

  authResponse.hasSession = true
  const userFullName = session?.user?.user_metadata?.full_name.split(' ')

  if (userFullName.length > 0) {
    authResponse.user.firstName = userFullName.slice(0, -1).join(' ')
    authResponse.user.lastName = userFullName[userFullName.length - 1]
  }

  return authResponse
}
