'use client'
import React, { type ReactNode } from 'react'
import styles from './Button.module.scss'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
  variant?: string
}
export const Button: React.FC<ButtonProps> = ({ onClick, children, variant }) => {
  let variantClass = styles.primary
  if (variant === 'secondary') {
    variantClass = styles.secondary
  }
  if (variant === 'tertiary') {
    variantClass = styles.tertiary
  }
  if (variant === 'minimal') {
    variantClass = styles.minimal
  }

  return (
      <button onClick={onClick} data-testid="button" className={`${styles.button} ${variantClass}`}>
          {children}
      </button>
  )
}
