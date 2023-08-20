'use client'
import React, { createContext, type PropsWithChildren } from 'react'
import { type UseSessionResponse } from '@/hooks/useSession'

/** SessionContext is the context which stores a user's session so that any children components can access it */
export const SessionContext = createContext({
  hasSession: false,
  user: {
    id: '',
    firstName: '',
    lastName: ''
  }
})

/** SessionProvider allows you to pass the user's session information from a server-side component
 * to any client-side components via React Context.
 *
 * @param children - A single React child.
 * @param user - The User object returned from `useSession()`
 * @param hasSession - The boolean returned from `useSession()`
 * */
export const SessionProvider: React.FC<PropsWithChildren<UseSessionResponse>> = async ({ children, user, hasSession }) => {
  return (
      <SessionContext.Provider value={{ user, hasSession }}>
          {children}
      </SessionContext.Provider>
  )
}
