import React from 'react'
import { render, screen } from '@testing-library/react'
import DashboardPage from '@/app/dashboard/page'

describe('Dashboard Page', () => {
  it('renders the page ', () => {
    render(<DashboardPage />)
    expect(screen.getByTestId('dashboard')).toBeVisible()
  })
})
