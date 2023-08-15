import React from 'react'
import { render, screen } from '@testing-library/react'
import { Card } from '@/components/Card/Card'

describe('Card', () => {
  describe('headerText', () => {
    it('displays correct text', () => {
      render(<Card headerText={'Boo!'} bodyText={''}/>)
      expect(screen.getByText('Boo!')).toBeVisible()
    })
  })
  describe('bodyText', () => {
    it('displays correct text', () => {
      render(<Card headerText={''} bodyText={'Scary'}/>)
      expect(screen.getByText('Scary')).toBeVisible()
    })
  })
})
