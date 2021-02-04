import { useReducer, useRef, useLayoutEffect, useContext } from 'react'
import { ValidationError } from 'class-validator'

import FormContext from '../components/form/context'
import FormFields from '../components/form/fields'
import FormSubject from '../components/form/subject'
import { FormFieldKeysOrString } from '../types'

function useErrorsWithSubject<T extends FormFields>(
  form: FormSubject<T>,
  keys: string[] = []
): ValidationError[] {
  const forceRender = useReducer((s) => s + 1, 0)[1] as () => void

  const latestErrors = useRef<ValidationError[]>([])

  const errors: ValidationError[] = latestErrors.current

  // fires synchronously after DOM mutations after EVERY render
  useLayoutEffect(() => {
    latestErrors.current = errors
  })

  // fires synchronously after DOM mutations only when component is mounted
  // ...or if / when the form dependency changes
  useLayoutEffect(() => {
    function checkForUpdates() {
      const newErrors = form.getErrors()
      const newFilteredErrors =
        keys.length === 0
          ? newErrors
          : newErrors.filter(({ property }) => {
              return keys.indexOf(property) !== -1
            })

      if (latestErrors.current.length === 0 && newFilteredErrors.length === 0) {
        return
      }

      latestErrors.current = newFilteredErrors

      forceRender()
    }

    const unsubscribe = form.subscribe({
      type: 'ERROR',
      cb: checkForUpdates
    })

    return () => unsubscribe()
  }, [form])

  return errors
}

function createErrorHook() {
  function useErrors<T extends FormFields>(
    keys?: FormFieldKeysOrString<T>[]
  ): ValidationError[] {
    const form = useContext<FormSubject>(FormContext)

    return useErrorsWithSubject<T>(form, keys as string[])
  }

  return useErrors
}

const useErrors = createErrorHook()

export default useErrors
