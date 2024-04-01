import React, {ChangeEventHandler, FormEventHandler, useState} from 'react'
import styles from '@/app/sign-in/sign-in.module.scss'
import { FormControl } from '@mui/base'
import { InputLabel } from '@/components/Form/InputLabel'
import { TextField } from '@/components/Form/TextField'
import { Button } from '@/components/Button/Button'
import { Error } from '@mui/icons-material'
import {createClientComponentClient} from '@supabase/auth-helpers-nextjs';

interface SignUpFormProps { error: string, setError: (error: string) => void }
export const SignUpForm: React.FC<SignUpFormProps> = ({error, setError}) => {
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
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

  const signUp = (): void => {
    const supabase = createClientComponentClient()
    supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
      options: {
        data: {
          firstName: userData.firstName,
          lastName: userData.lastName
        }
      }
    }).then(({ data, error }): void => {
      if (error?.message === 'User already registered') {
        setError('It looks like you already have an account.')
      } else if (error !== null) {
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
    signUp()
  }

  return (

    <form onSubmit={onSubmit}>
      <div className={styles.form}>
        {
          formFields.map((field) => (
            <FormControl key={field.name} className={styles.textField}>
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
      <Button onClick={() => {}} variant={'secondary'}>Sign Up With Email</Button>
      {error !== '' && (
        <div className={styles.error}><Error/>{error}</div>
      )}
    </form>
  )
}
