'use client'
import React from 'react'
import { MenuRounded } from '@mui/icons-material'
import styles from './NavBar.module.scss'
import { Button } from '@/components/Button/Button'
import { AppBar, Box, Drawer, IconButton } from '@mui/material'
import Link from 'next/link'

interface NavBarProps {
  currentPage: string
}

export const NavBar = ({ currentPage }: NavBarProps): JSX.Element => {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const navLinks = [
    { link: '/about', text: 'About' },
    { link: '/catalog', text: 'Catalog' }
  ]

  const redirectToSignUp = (): void => {
    window.location.href = '/sign-up'
  }

  const toggleDrawer = (open: boolean): void => {
    setDrawerOpen(open)
  }

  return (
      <>
          {/* THIS SECTION IS THE DESKTOP SECTION OF THE NAVBAR */}
          <AppBar component={'nav'} className={styles.navBar} data-testid={'nav-bar'}>
              <h1>
                  <Link data-testid={'landing-page-nav'} className={`${styles.navTitle} ${(currentPage === '/') ? styles.active : ''}`} href={'/'}>Spooky</Link>
              </h1>
              <Box className={styles.navLinks} sx={{ display: { xs: 'none', md: 'flex' } }}>
                  {navLinks.map(link => (
                      <Link
                          data-testid={`nav-link-${link.text}`}
                          className={`${styles.navText} ${(link.text === currentPage) ? styles.active : ''}`}
                          href={link.link}
                          key={link.link}
                      >
                          {link.text}
                      </Link>
                  ))}
              </Box>
              <Box className={styles.buttonWrapper} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Button onClick={redirectToSignUp}>Sign Up</Button>
              </Box>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={() => { toggleDrawer(true) }}
                  sx={{ ml: 'auto', display: { md: 'none' } }}
              >
                  <MenuRounded />
              </IconButton>
          </AppBar>
          {/* THIS SECTION IS THE DRAWER OF THE NAVBAR ON MOBILE */}
          <Box component="nav">
              <Drawer
                  // container={container}
                  className={styles.drawer}
                  variant="temporary"
                  open={drawerOpen}
                  onClose={() => { toggleDrawer(false) }}
                  ModalProps={{
                    keepMounted: true // Better open performance on mobile.
                  }}
                  sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                      boxSizing: 'border-box',
                      width: '70%',
                      padding: '1em 1.5em',
                      backgroundColor: 'var(--grimace)',
                      borderRight: '3px solid var(--black-cat)'
                    }
                  }}
              >
                  <h1>
                      <Link className={`${styles.navTitle} ${(currentPage === '/') ? styles.active : ''}`} href={'/'}>Spooky</Link>
                  </h1>
                  {navLinks.map(link => (
                      <Link
                          className={`${styles.navText} ${(link.text === currentPage) ? styles.active : ''}`}
                          href={link.link}
                          key={link.link}
                      >
                          {link.text}
                      </Link>
                  ))}
                  <Box className={styles.buttonWrapper} >
                      <Button onClick={redirectToSignUp}>Sign Up</Button>
                  </Box>
              </Drawer>
          </Box>
      </>
  )
}
