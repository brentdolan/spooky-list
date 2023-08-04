'use client'
import React from 'react'
import { Title } from '@/components/Title/Title'
import { Button } from '@/components/Button/Button'
import { NavBar } from '@/components/NavBar/NavBar'

const DashboardPage = (): JSX.Element => {
  return (
      <div data-testid={'dashboard'}>
          <NavBar currentPage={'Dashboard'} />
          <Title text={'Dashboard'} />
      </div>
  )
}

export default DashboardPage
