// type Class = { new(...args: any[]): any };
export interface Class<T> extends Function {
  new (...args: any[]): T
}

// https://medium.com/dailyjs/typescript-create-a-condition-based-subset-types-9d902cea5b8c
// transforms the type to flag all the undesired keys as 'never'
export type FlagExcludedType<Base, Type> = {
  [Key in keyof Base]: Base[Key] extends Type ? never : Key
}

// gets the keys that are not flagged as 'never'
export type AllowedNames<Base, Type> = FlagExcludedType<Base, Type>[keyof Base]

// uses this with Pick to get the right properties, excluding the undesired type
export type OmitType<Base, Type> = Pick<Base, AllowedNames<Base, Type>>

/* // simple, yet hard-coded (concrete) approach using Exclude
type FormFieldKeys<T extends FormFields> = Exclude<T, "validate">

type FormFieldData<T extends FormFields> = {
  readonly [P in FormFieldKeys<T>]: T[P]
}; */

export type FormFieldKeys<T> = AllowedNames<T, Function>

export type FormFieldKeysOrString<T> = FormFieldKeys<T> extends never
  ? string
  : FormFieldKeys<T>

export type FormFieldData<T> = {
  [P in FormFieldKeys<T>]: T[P]
}
