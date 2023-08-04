'use client'
import React from 'react'
import { Title } from '@/components/Title/Title'
import { NavBar } from '@/components/NavBar/NavBar'

const SignUpPage = (): JSX.Element => {
  return (
      <div data-testid={'sign-up'}>
          <NavBar currentPage={'Sign Up'} />
          <Title text={'Sign Up'} />
      </div>
  )
}

export default SignUpPage
