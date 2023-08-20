import { createServerActionClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

interface User {
  firstName: string
  lastName: string
  id: string
}

interface UseAuthResponse {
  hasSession: boolean
  user: User
}

export const useAuth = async (): Promise<UseAuthResponse> => {
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
