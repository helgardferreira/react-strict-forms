import React, { Component } from 'react'

import FormFields from './fields'
import FormSubject from './subject'
import { FormFieldData } from '../../types'
import FormProvider from './provider'

interface FormProps<T extends FormFields> {
  fields: T
  handleSubmit: (fields: FormFieldData<T>) => void
}

interface FormState<T extends FormFields> {
  formSubject: FormSubject<T>
}

export default class StrictForm<T extends FormFields> extends Component<
  FormProps<T>,
  FormState<T>
> {
  state = {
    formSubject: new FormSubject(this.props.fields)
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    const errors = this.state.formSubject.validate()

    if (errors.length === 0) {
      this.props.handleSubmit(this.state.formSubject.fields)
    }

    e.preventDefault()
  }

  componentDidUpdate(prevProps: FormProps<T>) {
    if (prevProps.fields !== this.props.fields) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        formSubject: new FormSubject(this.props.fields)
      })
    }
  }

  render() {
    return (
      <FormProvider value={this.state.formSubject}>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          {this.props.children}
        </form>
      </FormProvider>
    )
  }
}
