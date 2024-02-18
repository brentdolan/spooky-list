import React, { Suspense } from 'react'
import MovieDetailSkeleton from '@/app/catalog/[id]/loading'
import { NavBar } from '@/components/NavBar/NavBar'
interface LayoutProps {
  children?: React.ReactNode
}

const RootLayout: React.FC<LayoutProps> = async ({ children }) => {
  return (
      <Suspense fallback={<MovieDetailSkeleton />}>
          <NavBar currentPage={'/'} />
          {/* Children of Layout is Page */}
          {children}
      </Suspense>
  )
}

export default RootLayout
