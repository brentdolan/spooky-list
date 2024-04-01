'use client'
import React, { useContext, useState } from 'react'
import styles from './sign-up.module.scss'
import { Button } from '@/components/Button/Button'
import { Divider } from '@mui/material'
import Link from 'next/link'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContext } from '@/providers/SessionProvider'
import { redirect } from 'next/navigation'
import { SignUpForm } from '@/app/sign-up/SignUpForm'

const SignUpPage: React.FC = async () => {
  const { hasSession } = useContext(SessionContext)
  const [error, setError] = useState('')

  if (hasSession) {
    return redirect('/')
  }

  const signUpWithGoogle = (): void => {
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
      <div data-testid={'sign-up'}>
          <div className={styles.formContainer}>
              <h2 className={styles.header} >Sign Up</h2>
              <SignUpForm error={error} setError={setError}/>
              <p className={styles.linkText}>Already have an account? <Link href={'/sign-in'}>Sign in.</Link></p>
              <Divider className={styles.divider}>or</Divider>
              <Button onClick={signUpWithGoogle} >Sign Up With Google</Button>
          </div>
      </div>
  )
}

export default SignUpPage
