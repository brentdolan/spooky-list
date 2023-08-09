'use client'
import React from 'react'
import { MenuRounded } from '@mui/icons-material'
import styles from './NavBar.module.scss'
import { Button } from '@/components/Button/Button'
import { AppBar, Box, Drawer, IconButton } from '@mui/material'

interface NavBarProps {
  currentPage: string
}

export const NavBar = ({ currentPage }: NavBarProps): JSX.Element => {
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const navLinks = [
    { link: '/dashboard', text: 'Dashboard' },
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
          <AppBar component={'nav'} className={styles.navBar} data-testid={'nav-bar'}>
              <h1 className={styles.navTitle}>Spooky</h1>
              <Box className={styles.navLinks} sx={{ display: { xs: 'none', md: 'flex' } }}>
                  {navLinks.map(link => (
                      <a
                          data-testid={`nav-link-${link.text}`}
                          className={`${styles.navText} ${(link.text === currentPage) ? styles.active : ''}`}
                          href={link.link}
                          key={link.link}
                      >
                          {link.text}
                      </a>
                  ))}
              </Box>
              <Box className={styles.buttonWrapper} sx={{ display: { xs: 'none', md: 'block' } }}>
                  <Button text={'Sign Up'} onClick={redirectToSignUp} />
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
                      paddingInline: '2rem',
                      backgroundColor: 'var(--grimace)',
                      borderRight: '3px solid var(--black-cat)'
                    }
                  }}
              >
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
                  <Box className={styles.buttonWrapper} >
                      <Button text={'Sign Up'} onClick={redirectToSignUp} />
                  </Box>
              </Drawer>
          </Box>
      </>
  )
}
