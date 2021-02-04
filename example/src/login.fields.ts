import { FormFields } from 'react-strict-forms'
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
