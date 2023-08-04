'use client'
import React from 'react'
import { Title } from '@/components/Title/Title'
import { Button } from '@/components/Button/Button'
import { NavBar } from '@/components/NavBar/NavBar'

const Page = (): JSX.Element => {
  return (
      <div data-testid={'about'}>
          <NavBar currentPage={'About'} />
          <Title text={'About'} />
      </div>
  )
}

export default Page
