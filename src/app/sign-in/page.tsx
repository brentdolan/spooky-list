'use client'
import React, { type ChangeEventHandler, type FormEventHandler, useContext, useState } from 'react'
import styles from './sign-in.module.scss'
import { Divider } from '@mui/material'
import { Button } from '@/components/Button/Button'
import { FormControl } from '@mui/base'
import { InputLabel } from '@/components/Form/InputLabel'
import { TextField } from '@/components/Form/TextField'
import Link from 'next/link'
import { Error } from '@mui/icons-material'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { SessionContext } from '@/providers/SessionProvider'
import { redirect } from 'next/navigation'

const SignInPage = (): JSX.Element => {
  const { hasSession } = useContext(SessionContext)

  if (hasSession) {
    return redirect('/')
  }

  const [error, setError] = useState('')
  const [userData, setUserData] = useState({
    email: '',
    password: ''
  })

  const onChange: ChangeEventHandler<HTMLInputElement> = (e): void => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const formFields: Array<{
    placeholderText: string
    label: string
    name: string
  }> = [
    {
      placeholderText: 'hockeymask@crystallake.com',
      label: 'Email Address',
      name: 'email'
    },
    {
      placeholderText: '********',
      label: 'Password',
      name: 'password'
    }
  ]

  const signIn = (): void => {
    const supabase = createClientComponentClient()
    supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password
    }).then(({ data, error }): void => {
      if (error !== null) {
        setError('Something went wrong. Please try again!')
      } else {
        const token = data.session?.access_token ?? ''
        window.location.href = `/auth/callback?access_token=${token}`
      }
    }).catch((err) => {
      console.error(err)
      setError('Something went wrong. Please try again!')
    })
  }

  const signInWithGoogle = (): void => {
    const supabase = createClientComponentClient()
    supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback'
      }
    }).catch((err) => {
      console.error(err)
      setError('Something went wrong. Please try again!')
    })
  }

  const onSubmit: FormEventHandler = (e): void => {
    e.preventDefault()
    signIn()
  }

  return (
      <div data-testid={'sign-in'}>
          <div className={styles.formContainer}>
              <h2 className={styles.header} >Sign In</h2>
              <form onSubmit={onSubmit} >
                  <div className={styles.form}>
                      {
                        formFields.map((field) => (
                            <FormControl key={field.placeholderText} className={styles.textField}>
                                <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
                                <TextField
                                    onChange={onChange}
                                    id={field.name}
                                    name={field.name}
                                    placeholder={field.placeholderText}
                                    variant={'filled'}
                                    InputLabelProps={{
                                      shrink: true
                                    }}
                                />
                            </FormControl>
                        ))
                      }
                  </div>
                  <Button onClick={() => {}} variant={'secondary'}>Sign In</Button>
                  {error !== '' && (
                      <div className={styles.error}><Error/>{error}</div>
                  )}
                  <p className={styles.linkText}>Don&apos;t have an account yet? <Link href={'/sign-up'}>Sign up</Link></p>
              </form>
              <Divider className={styles.divider}>or</Divider>
              <Button onClick={signInWithGoogle} >Sign In With Google</Button>
          </div>
      </div>
  )
}

export default SignInPage
