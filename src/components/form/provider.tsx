import React, { FunctionComponent } from 'react'
import FormContext from './context'
import FormSubject from './subject'

const FormProvider: FunctionComponent<{ value: FormSubject }> = (props) => {
  const { value, children } = props
  const formContextState = value

  return (
    <FormContext.Provider value={formContextState}>
      {children}
    </FormContext.Provider>
  )
}

export default FormProvider
