'use client'
import React from 'react'
import styles from './sign-up.module.scss'
import { NavBar } from '@/components/NavBar/NavBar'
import { Button } from '@/components/Button/Button'
import { TextField } from '@/components/Form/TextField'
import { InputLabel } from '@/components/Form/InputLabel'
import { FormControl } from '@mui/base'
import { Divider } from '@mui/material'
import Link from 'next/link'

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
              <form>
                  <div className={styles.form}>
                      {
                        formFields.map((field) => (
                            <FormControl key={field.name} className={styles.textField}>
                                <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
                                <TextField
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
                  <Button onClick={() => {}} variant={'tertiary'}>Sign Up With Email</Button>
                  <p className={styles.linkText}>Already have an account? <Link href={'/sign-in'}>Sign in.</Link></p>
              </form>
              <Divider className={styles.divider}>or</Divider>
              <Button onClick={() => {}} >Sign Up With Google</Button>
          </div>

      </div>
  )
}

export default SignUpPage
