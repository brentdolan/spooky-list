'use client'
import React from 'react'
import styles from './sign-in.module.scss'
import { NavBar } from '@/components/NavBar/NavBar'
import { Divider, TextField } from '@mui/material'
import { Button } from '@/components/Button/Button'

const SignInPage = (): JSX.Element => {
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

  return (
      <div data-testid={'sign-in'}>
          <NavBar currentPage={'/'} />
          <div className={styles.formContainer}>
              <h2 className={styles.header} >Sign In</h2>
              <form className={styles.form}>
                  {
                    formFields.map((field) => (
                        <TextField
                            className={styles.textField}
                            key={field.placeholderText}
                            label={field.label}
                            name={field.name}
                            placeholder={field.placeholderText}
                            variant={'filled'}
                            InputLabelProps={{
                              shrink: true
                            }}
                        />
                    ))
                  }
                  <Button onClick={() => {}} variant={'tertiary'}>Sign In</Button>
              </form>
              <Divider className={styles.divider}>or</Divider>
              <Button onClick={() => {}} >Sign In With Google</Button>
          </div>

      </div>
  )
}

export default SignInPage
