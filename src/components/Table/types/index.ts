export interface Row {
  [field: string]: any
}

export interface Column {
  field: string
  label: string
  type?: 'date' | 'datetime' | 'currency' | 'string'
  align?: 'left' | 'right' | 'center'
  hidden?: boolean
}
