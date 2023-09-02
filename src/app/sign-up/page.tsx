'use client'
import React from 'react'
import styles from './sign-up.module.scss'
import { NavBar } from '@/components/NavBar/NavBar'
import { Divider, TextField } from '@mui/material'
import { Button } from '@/components/Button/Button'

const SignUpPage = (): JSX.Element => {
  const formFields: Array<{
    placeholderText: string
    label: string
    name: string
  }> = [
    {
      placeholderText: 'Jason',
      label: 'First Name',
      name: 'firstName'
    },
    {
      placeholderText: 'Voorhees',
      label: 'Last Name',
      name: 'lastName'
    },
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
      <div data-testid={'sign-up'}>
          <NavBar currentPage={'/'} />
          <div className={styles.formContainer}>
              <h2 className={styles.header} >Sign Up</h2>
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
                  <Button onClick={() => {}} variant={'tertiary'}>Sign Up With Email</Button>
              </form>
              <Divider className={styles.divider}>or</Divider>
              <Button onClick={() => {}} >Sign Up With Google</Button>
          </div>

      </div>
  )
}

export default SignUpPage
