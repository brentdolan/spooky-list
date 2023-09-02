'use client'
import React from 'react'
import styles from './sign-in.module.scss'
import { NavBar } from '@/components/NavBar/NavBar'
import { Divider } from '@mui/material'
import { Button } from '@/components/Button/Button'
import { FormControl } from '@mui/base'
import { InputLabel } from '@/components/Form/InputLabel'
import { TextField } from '@/components/Form/TextField'
import Link from 'next/link'

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
                  <div className={styles.form}>
                      {
                        formFields.map((field) => (
                            <FormControl key={field.placeholderText} className={styles.textField}>
                                <InputLabel htmlFor={field.name}>{field.label}</InputLabel>
                                <TextField
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
                  <Button onClick={() => {}} variant={'tertiary'}>Sign In</Button>
                  <p className={styles.linkText}>Don&apos;t have an account yet? <Link href={'/sign-up'}>Sign up</Link></p>
              </form>
              <Divider className={styles.divider}>or</Divider>
              <Button onClick={() => {}} >Sign In With Google</Button>
          </div>

      </div>
  )
}

export default SignInPage
