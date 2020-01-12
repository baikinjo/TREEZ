import React, { useState } from 'react'
import { auth, signInWithGoogle } from '../../utils/firebase.utils'

import { Button, Form, Message, Divider } from 'semantic-ui-react'

const SignIn = () => {
  const [userCredentials, $userCredentials] = useState({
    email: '',
    password: ''
  })
  const [errors, $errors] = useState({
    exist: false,
    code: '',
    message: ''
  })

  const { email, password } = userCredentials

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await auth.signInWithEmailAndPassword(email, password)
      $userCredentials({
        email: '',
        password: ''
      })
    } catch (error) {
      $errors({
        exist: true,
        code: error.code,
        message: error.message
      })
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.exist) {
      $errors({
        exist: false,
        code: '',
        message: ''
      })
    }
    const { value, name } = event.target

    $userCredentials({
      ...userCredentials,
      [name]: value
    })
  }

  const handleDismiss = () => {
    $errors({
      exist: false,
      code: '',
      message: ''
    })
    $userCredentials({
      ...userCredentials,
      password: ''
    })
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Field required error={errors.exist}>
          <label>Email</label>
          <input
            type='email'
            name='email'
            placeholder='email@treez.com'
            value={userCredentials.email}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field required error={errors.exist}>
          <label>Password</label>
          <input
            type='password'
            name='password'
            value={userCredentials.password}
            onChange={handleChange}
          />
        </Form.Field>
        <Button color='teal' type='submit'>
          Sign In
        </Button>
      </Form>
      <Divider horizontal>Or</Divider>
      <Button color='google plus' onClick={signInWithGoogle}>
        {' '}
        Sign in with Google{' '}
      </Button>
      {errors.exist && (
        <Message
          onDismiss={handleDismiss}
          error
          header={errors.code}
          content={errors.message}
        />
      )}
    </>
  )
}
export default SignIn
