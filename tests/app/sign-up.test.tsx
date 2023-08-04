import React from 'react'
import { render, screen } from '@testing-library/react'
import SignupPage from '@/app/sign-up/page'

describe('Signup Page', () => {
  it('renders the page ', () => {
    render(<SignupPage />)
    expect(screen.getByTestId('sign-up')).toBeVisible()
  })
})
