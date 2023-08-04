import React from 'react'
import { render, screen } from '@testing-library/react'
import CatalogPage from '@/app/catalog/page'

describe('Catalog Page', () => {
  it('renders the page ', () => {
    render(<CatalogPage />)
    expect(screen.getByTestId('catalog')).toBeVisible()
  })
})
