import React, { type ChangeEventHandler, type FormEventHandler, useState } from 'react'
import styles from './sign-in.module.scss'
import { FormControl } from '@mui/base'
import { InputLabel } from '@/components/Form/InputLabel'
import { TextField } from '@/components/Form/TextField'
import { Button } from '@/components/Button/Button'
import { Error } from '@mui/icons-material'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

interface SignInFormProps { error: string, setError: (error: string) => void }
export const SignInForm: React.FC<SignInFormProps> = ({error, setError}) => {
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
  const onSubmit: FormEventHandler = (e): void => {
    e.preventDefault()
    signIn()
  }
  return (

      <form onSubmit={onSubmit}>
          <div className={styles.form}>
              {formFields.map((field) => (
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
          <Button onClick={() => {
          }} variant={'secondary'}
          >Sign In</Button>
          {error !== '' && (
          <div className={styles.error}><Error/>{error}</div>
          )}
      </form>
  )
}
