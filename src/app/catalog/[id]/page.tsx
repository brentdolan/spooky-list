'use client'
import React from 'react'
import { NavBar } from '@/components/NavBar/NavBar'

const Page: React.FC = () => {
  return (
      <div data-testid={'movies-details'}>
          <NavBar currentPage={'Catalog'} />
          <div>
              <img />
          </div>
      </div>
  )
}

export default Page
