import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { type AuthSession } from '@supabase/supabase-js'

async function registerUser ({ session }: { session: AuthSession | null }): Promise<boolean> {
  if (!session) return false

  try {
    const { email, id } = session.user
    let { firstName, lastName } = session.user.user_metadata
    const fullName = session.user.user_metadata.full_name

    // If we get a Google user, they use full-name
    if (fullName && (!firstName || !lastName)) {
      const splitName = fullName.split(' ')
      firstName = splitName.slice(0, -1).join(' ')
      lastName = splitName[splitName.length - 1]
    }

    if (process.env.BACKEND_URL) {
      const response = await fetch(`${process.env.BACKEND_URL}/users/register/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, email, first_name: firstName, last_name: lastName })
      })

      if (response.status !== 200) {
        console.error(`Failed to create user: ${email ?? ''}`)
        return false
      }
    }
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}

export async function GET (request: Request): Promise<NextResponse> {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const token = requestUrl.searchParams.get('access_token')
  let session = null

  if (token !== null) {
    const sb = createRouteHandlerClient({ cookies })
    session = await sb.auth.getSession()
  } else if (code !== null) {
    const sb = createRouteHandlerClient({ cookies })
    session = await sb.auth.exchangeCodeForSession(code)
  }

  if (session) {
    const registrationSuccessful = await registerUser(session.data)
    if (registrationSuccessful) {
      return NextResponse.redirect(requestUrl.origin)
    } else {
      return NextResponse.redirect('/500')
    }
  } else {
    return NextResponse.redirect('/500')
  }
}
