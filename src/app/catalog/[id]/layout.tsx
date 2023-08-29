import React, { Suspense } from 'react'
import MovieDetailSkeleton from '@/app/catalog/[id]/loading'
import { NavBar } from '@/components/NavBar/NavBar'

const RootLayout = ({
  children
}: {
  children: React.ReactNode
}): JSX.Element => {
  return (
      <Suspense fallback={<MovieDetailSkeleton/>}>
          <NavBar currentPage={'Catalog'}/>
          {/* Children of Layout is Page */}
          {children}
      </Suspense>
  )
}

export default RootLayout
