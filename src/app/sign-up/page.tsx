'use client'
import React from 'react'
import { Title } from '@/components/title/title'
import { NavBar } from '@/components/NavBar/NavBar'

const SignUpPage = (): JSX.Element => {
  return (
      <div>
          <NavBar currentPage={'Sign Up'} />
          <Title text={'Sign Up'} />
      </div>
  )
}

export default SignUpPage
