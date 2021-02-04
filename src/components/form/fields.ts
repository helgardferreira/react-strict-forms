import { validateSync, ValidationError } from 'class-validator'

export default class FormFields {
  validate(): ValidationError[] {
    return validateSync(this)
  }
}
