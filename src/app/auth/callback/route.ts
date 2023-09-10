import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET (request: Request): Promise<NextResponse> {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const token = requestUrl.searchParams.get('access_token')

  if (token !== null) {
    const sb = createRouteHandlerClient({ cookies })
    await sb.auth.getSession()
    return NextResponse.redirect(requestUrl.origin)
  }

  if (code !== null) {
    const sb = createRouteHandlerClient({ cookies })
    await sb.auth.exchangeCodeForSession(code)
    return NextResponse.redirect(requestUrl.origin)
  }

  return NextResponse.redirect(requestUrl.origin)
}
