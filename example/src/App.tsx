import React, { FunctionComponent } from 'react'

import { StrictForm, useForm, useErrors } from 'react-strict-forms'
import { LoginFields } from './login.fields'

const Login: FunctionComponent = () => {
  const [{ username, password }, setFieldValue] = useForm<LoginFields>()

  const errors = useErrors()

  console.log(JSON.stringify(errors, null, 2))

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
  console.log('rendering App...')

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
