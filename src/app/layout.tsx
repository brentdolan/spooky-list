import React from 'react'
import './globals.css'
import type { Metadata } from 'next'
import { Epilogue, Inter, Poppins } from 'next/font/google'
import { useSession } from '@/hooks/useSession'
import { SessionProvider } from '@/providers/SessionProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spooky 👻',
  description: 'Get spooky and start making your scary movie list today!'
}

const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--headingFont',
  display: 'swap'
})

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--primaryFont',
  display: 'swap'
})

const RootLayout: React.FC<{ children: React.ReactNode }> = async ({
  children
}) => {
  const { hasSession, user } = await useSession()
  return (
      <html lang="en">
          <SessionProvider hasSession={hasSession} user={user}>
              <body className={`${poppins.variable} ${epilogue.variable} ${inter.className}`}>{children}</body>
          </SessionProvider>
      </html>
  )
}

export default RootLayout
