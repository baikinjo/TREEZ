import React, { useState } from 'react'
import { Form, Button, Message } from 'semantic-ui-react'

import { auth, createUserProfileDocument } from '../../utils/firebase.utils'

const SignUp = () => {
  const [userCredentials, $userCredentials] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [errors, $errors] = useState({
    exist: false,
    code: '',
    message: ''
  })

  const { email, password, confirmPassword } = userCredentials

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      $errors({
        exist: true,
        code: 'not match',
        message: 'Password do not match'
      })
      return
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      )
      await createUserProfileDocument(user)
      $userCredentials({
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch (error) {
      $errors({
        exist: true,
        code: error.code,
        message: error.message
      })
    }
  }

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (errors.exist) {
      $errors({
        exist: false,
        code: '',
        message: ''
      })
    }
    const { name, value } = event.target

    $userCredentials({ ...userCredentials, [name]: value })
  }

  const handleDismiss = () => {
    $errors({
      exist: false,
      code: '',
      message: ''
    })
    $userCredentials({
      ...userCredentials,
      password: '',
      confirmPassword: ''
    })
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Field required>
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

        <Form.Field required error={errors.exist}>
          <label>Confirm Password</label>
          <input
            type='password'
            name='confirmPassword'
            value={userCredentials.confirmPassword}
            onChange={handleChange}
          />
        </Form.Field>
        <Button color='twitter' type='submit'>
          Sign Up
        </Button>
      </Form>
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

export default SignUp
