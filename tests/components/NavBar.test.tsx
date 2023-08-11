import React from 'react'
import { render, screen } from '@testing-library/react'
import { NavBar } from '@/components/NavBar/NavBar'

describe('NavBar', () => {
  it('Renders the NavBar', () => {
    render(<NavBar currentPage={'LandingPage'} />)
    expect(screen.getByTestId('nav-bar')).toBeVisible()
  })
  describe('currentPage', () => {
    it('Shows the correct nav link as active', () => {
      render(<NavBar currentPage="LandingPage" />)

      expect(screen.getByTestId('landing-page').className).toContain('navTitle')
    })

    it('Shows non-active nav links as non-active', () => {
      render(<NavBar currentPage="LandingPage" />)

      expect(screen.getByTestId('nav-link-About').className).not.toContain('active')
    })
  })
})
