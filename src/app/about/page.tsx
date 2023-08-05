'use client'
import React from 'react'
import { NavBar } from '@/components/NavBar/NavBar'

const Page = (): JSX.Element => {
  return (
      <div data-testid={'about'}>
          <NavBar currentPage={'About'} />
      </div>
  )
}

export default Page
