'use client'
import React from 'react'
import { NavBar } from '@/components/NavBar/NavBar'

const Page = (): JSX.Element => {
  return (
      <div data-testid={'movies-details'}>
          <NavBar currentPage={'Catalog'} />
      </div>
  )
}

export default Page
