import React from 'react'
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/Button/Button'

describe('Button', () => {
  describe('text', () => {
    it('Renders the right text', () => {
      const buttonText = 'Pickles'
      render(<Button text={buttonText} onClick={() => {}} />)

      expect(screen.getByTestId('button').innerHTML).toBe(buttonText)
    })
  })

  describe('onClick', () => {
    it('Calls the onClick function when its passed in', () => {
      const onClick = jest.fn()
      render(<Button text={''} onClick={onClick} />)

      screen.getByTestId('button').click()
      expect(onClick).toBeCalledTimes(1)
    })
  })
})
