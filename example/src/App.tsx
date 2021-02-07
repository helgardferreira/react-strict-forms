import React, { FunctionComponent } from 'react'

import { StrictForm, useForm, useErrors } from 'react-strict-forms'
import { LoginFields } from './login.fields'

const Login: FunctionComponent = () => {
  const [
    {
      fields: { username, password },
      isDirty
    },
    setFieldValue
  ] = useForm<LoginFields>()

  const errors = useErrors()

  console.log(errors.length)
  console.log(isDirty())

  return (
    <div>
      React Strict Forms Example{' '}
      <span role='img' aria-label='smiling emoji'>
        😄
      </span>
      '
      <input
        type='text'
        name='username'
        id='username'
        value={username}
        onChange={setFieldValue('username')}
      />
      <input
        type='password'
        name='password'
        id='password'
        value={password}
        onChange={setFieldValue('password')}
      />
      <input type='submit' value='Submit' />
    </div>
  )
}

const App = () => {
  return (
    <StrictForm
      fields={new LoginFields('', '')}
      handleSubmit={(fields) => console.log(fields)}
    >
      <Login />
    </StrictForm>
  )
}

export default App
