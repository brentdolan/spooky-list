import React from 'react'
import { render, screen } from '@testing-library/react'
import LandingPage from '@/app/page'

describe('Landing Page', () => {
  it('renders the page ', () => {
    render(<LandingPage />)
    expect(screen.getByTestId('landing-page')).toBeVisible()
  })
})
