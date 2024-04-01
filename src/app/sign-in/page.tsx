'use client'
import React, { useContext, useState } from 'react'
import styles from './sign-in.module.scss'
import { Divider } from '@mui/material'
import { Button } from '@/components/Button/Button'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContext } from '@/providers/SessionProvider'
import { redirect } from 'next/navigation'
import { SignInForm } from '@/app/sign-in/SignInForm'

const SignInPage = (): JSX.Element => {
  const { hasSession } = useContext(SessionContext)
  const [error, setError] = useState('')
  if (hasSession) {
    return redirect('/')
  }
  const signInWithGoogle = (): void => {
    const supabase = createClientComponentClient()
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: '/auth/callback'
      }
    }).catch((err) => {
      console.error(err)
      setError('Something went wrong. Please try again!')
    })
  }

  return (
      <div data-testid={'sign-in'}>
          <div className={styles.formContainer}>
              <h2 className={styles.header} >Sign In</h2>
              <SignInForm error={error} setError={setError}/>
              <p className={styles.linkText}>Don&apos;t have an account yet? <Link href={'/sign-up'}>Sign up</Link></p>
              <Divider className={styles.divider}>or</Divider>
              <Button onClick={signInWithGoogle} >Sign In With Google</Button>
          </div>
      </div>
  )
}

export default SignInPage
