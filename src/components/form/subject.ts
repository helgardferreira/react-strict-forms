import { ValidationError } from 'class-validator'
import FormFields from './fields'
import { FormFieldKeys, FormFieldData } from '../../types'
// import { FormFields } from "./types";

type FormObserverType = 'ERROR' | 'STATE'

interface FormObserver {
  type: FormObserverType
  // fields?: FormFieldKeysOrString<T>[];
  cb: Function
}

// simplified observer pattern to notify components of internal form changes
// i.e. errors returned from form validation
export default class FormSubject<T extends FormFields = any> {
  // naming things is hard...
  fields: FormFieldData<T> = {} as any
  readonly initialFields: FormFieldData<T> = {} as any

  private _fields: T
  private _errors: ValidationError[]
  private _observers: FormObserver[]

  constructor(fields: T) {
    // naming things is hard...
    this._fields = fields

    for (const [k, v] of Object.entries(fields)) {
      if (typeof v !== 'function') {
        this.fields[k] = v
        this.initialFields[k] = v
      }
    }

    this._errors = []
    this._observers = []
  }

  validate(): ValidationError[] {
    this._errors = this._fields.validate()

    this.notify('ERROR')

    return this._errors
  }

  subscribe(o: FormObserver) {
    this._observers.push(o)

    const unsubscribe = () => {
      const observerIndex = this._observers.indexOf(o)
      this._observers.splice(observerIndex, 1)
    }

    return unsubscribe
  }

  getErrors(): ValidationError[] {
    return this._errors
  }

  setState<U extends FormFieldKeys<T>>(key: U, value: FormFieldData<T>[U]) {
    if (this.fields[key] !== undefined) {
      this.fields[key] = value
      this._fields[key] = value
    } else if (process.env.NODE_ENV !== 'production')
      throw new Error(`"${key}" is an invalid key`)
  }

  private notify(type: FormObserverType) {
    const observers = this._observers.filter((o) => o.type === type)

    observers.forEach((o) => o.cb())
  }
}
