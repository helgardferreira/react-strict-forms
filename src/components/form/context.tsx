import { createContext } from 'react'

import FormSubject from './subject'

const FormContext = createContext<FormSubject>(null!)

export default FormContext
