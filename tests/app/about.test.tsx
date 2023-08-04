import React from 'react'
import { render, screen } from '@testing-library/react'
import AboutPage from '@/app/about/page'

describe('About Page', () => {
  it('renders the page ', () => {
    render(<AboutPage />)
    expect(screen.getByTestId('about')).toBeVisible()
  })
})
