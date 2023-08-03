'use client'
import React from 'react'
import styles from './NavBar.module.scss'
import { Button } from '@/components/button/button'

interface NavBarProps {
  currentPage: string
}

export const NavBar = ({ currentPage }: NavBarProps): JSX.Element => {
  const navLinks = [
    { link: '/dashboard', text: 'Dashboard' },
    { link: '/about', text: 'About' },
    { link: '/catalog', text: 'Catalog' }
  ]
  const redirectToSignUp = (): void => {
    window.location.href = '/sign-up'
  }
  return (
      <nav className={styles.navBar}>
          <h1 className={styles.navTitle}>Spooky</h1>
          {navLinks.map(link => (
              <a
                  className={`${styles.navText} ${(link.text === currentPage) ? styles.active : ''}`}
                  href={link.link}
                  key={link.link}
              >
                  {link.text}
              </a>
          ))}
          <div className={styles.buttonWrapper}>
              <Button text={'Sign Up'} onClick={redirectToSignUp} />
          </div>
      </nav>
  )
}
