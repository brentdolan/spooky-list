'use client'
import React, { useContext } from 'react'
import { MenuRounded } from '@mui/icons-material'
import styles from './NavBar.module.scss'
import { Button } from '@/components/Button/Button'
import { Box, Drawer, IconButton } from '@mui/material'
import Link from 'next/link'
import { SessionContext } from '@/providers/SessionProvider'

interface NavBarProps {
  currentPage: string
}

export const NavBar: React.FC<NavBarProps> = ({ currentPage }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false)

  const navLinks = [
    { link: '/catalog', text: 'Catalog' }
  ]

  const redirectToSignUp = (): void => {
    window.location.href = '/sign-up'
  }
  const redirectToSignIn = (): void => {
    window.location.href = '/sign-in'
  }

  const toggleDrawer = (open: boolean): void => {
    setDrawerOpen(open)
  }

  const { hasSession } = useContext(SessionContext)

  return (
      <>
          {/* THIS SECTION IS THE DESKTOP SECTION OF THE NAVBAR */}
          <Box component={'nav'} className={styles.navBar} data-testid={'nav-bar'}>
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
              <Box className={styles.buttonWrapper} sx={{ display: { xs: 'none', md: 'flex' } }}>
                  {hasSession
                    ? <Link className={styles.navText} href={'/me'}>My Account</Link>
                    : (
                        <>
                            <Button onClick={redirectToSignUp}>Sign Up</Button>
                            <Button variant={'secondary'} onClick={redirectToSignIn}>Sign In</Button>
                        </>
                      )}
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
          </Box>
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
                      backgroundColor: 'var(--black-cat)',
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
                  <Box className={styles.buttonWrapper} sx={{ display: { xs: 'flex', md: 'none' } }} >
                      {hasSession
                        ? <Link className={styles.navText} href={'/me'}>My Account</Link>
                        : (
                            <>
                                <Button onClick={redirectToSignUp}>Sign Up</Button>
                                <Button variant={'secondary'} onClick={redirectToSignIn}>Sign In</Button>
                            </>
                          )}
                  </Box>
              </Drawer>
          </Box>
      </>
  )
}
