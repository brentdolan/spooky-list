'use client'
import React, { type ReactNode } from 'react'
import styles from './Button.module.scss'
import { CircularProgress } from '@mui/material'

interface ButtonProps {
  children: ReactNode
  onClick: () => void
  variant?: string
  loading?: boolean
}
export const Button: React.FC<ButtonProps> = ({ onClick, children, variant, loading = false }) => {
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
      <button disabled={loading} onClick={onClick} data-testid="button" className={`${styles.button} ${variantClass}`}>
          {loading ? <CircularProgress size={'1.5rem'} /> : children}
      </button>
  )
}
