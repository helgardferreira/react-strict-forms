import { useReducer, useContext, useCallback, useMemo } from 'react'
import isEqual from 'react-fast-compare'

import FormContext from '../components/form/context'
import FormFields from '../components/form/fields'
import FormSubject from '../components/form/subject'
import { FormFieldData, FormFieldKeys } from '../types'

/* function isChangeEvent(
  value: React.ChangeEvent<any> | any
): value is React.ChangeEvent<any> {
  return (value as React.ChangeEvent<any>).target !== undefined
} */

function createSetFieldValue<T extends FormFields>(form: FormSubject<T>) {
  const forceRender = useReducer((s) => s + 1, 0)[1] as () => void

  function setFieldValue<U extends FormFieldKeys<T>>(
    key: U
  ): (value: React.ChangeEvent<any>) => void
  function setFieldValue<U extends FormFieldKeys<T>>(
    key: U,
    value?: FormFieldData<T>[U]
  ): void
  function setFieldValue<U extends FormFieldKeys<T>>(
    key: U,
    value?: FormFieldData<T>[U]
  ): any {
    if (value === undefined) {
      return (value: React.ChangeEvent<any>) => {
        form.setState(key, value.target.value)
        forceRender()
      }
    }

    form.setState(key, value)
    forceRender()
  }

  return setFieldValue
}

export default function useForm<T extends FormFields>() {
  const form = useContext<FormSubject<T>>(FormContext)

  if (form === undefined && process.env.NODE_ENV !== 'production')
    throw new Error('useForm must be used within a FormProvider')

  const setFieldValue = useCallback(createSetFieldValue(form), [form])

  const isDirty = useCallback(() => !isEqual(form.initialFields, form.fields), [
    form
  ])

  const state = useMemo(() => ({ fields: form.fields, isDirty }), [form])

  return [state, setFieldValue] as const
}
