# react-strict-forms

> Strict Forms is an intuitive, and declarative React TypeScript Form library that aims to provide a stellar development experience.

[![NPM](https://img.shields.io/npm/v/react-strict-forms.svg)](https://www.npmjs.com/package/react-strict-forms) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-strict-forms
```

## Usage

```tsx
import React, { FunctionComponent } from 'react'
import { StrictForm, useForm, FormFields, useErrors } from 'react-strict-forms'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginFields extends FormFields {
  @IsNotEmpty()
  @IsString()
  username: string

  @IsNotEmpty()
  @IsString()
  password: string

  constructor(username = '', password = '') {
    super()
    this.username = username
    this.password = password
  }
}

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

const Example = () => {
  return (
    <StrictForm
      fields={new LoginFields('', '')}
      handleSubmit={(fields) => console.log(fields)}
    >
      <Login />
    </StrictForm>
  )
}
```

## License

MIT © [helgardferreira](https://github.com/helgardferreira)
