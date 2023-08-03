'use client'
import React from 'react'
import styles from './NavBar.module.scss'
import { Button } from '@/components/button/button'
import { Checkbox } from '@mui/material'
import { CheckCircleOutline } from '@mui/icons-material'

interface NavBarProps {
  currentPage: string
}

export const NavBar = ({ currentPage }: NavBarProps): JSX.Element => {
  return (
      <nav className={styles.navBar}>
          <h1 className={styles.navTitle}>Spooky</h1>
          <span className={styles.navText}>About</span>
          <span className={styles.navText}>Catalog</span>
          <div className={styles.buttonWrapper}>
              <Button text={'Sign Up'} onClick={() => {}} />
          </div>
      </nav>
  )
}
