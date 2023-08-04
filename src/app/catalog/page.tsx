import React from 'react'
import { Title } from '@/components/Title/Title'
import { Button } from '@/components/Button/Button'
import { NavBar } from '@/components/NavBar/NavBar'

const Page = (): JSX.Element => {
  return (
      <div data-testid={'catalog'}>
          <NavBar currentPage={'Catalog'} />
          <Title text={'Catalog'} />
      </div>
  )
}
export default Page
