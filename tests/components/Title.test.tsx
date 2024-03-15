import React from 'react'
import { render, screen } from '@testing-library/react'
import { Title } from '@/components/Title/Title'

describe('Title', () => {
  describe('text', () => {
    it('Renders the right text', () => {
      const titleText = 'Pickles'
      render(<Title text={titleText} />)

      expect(screen.getByTestId('title').innerHTML).toBe(titleText)
    })
  })
})
