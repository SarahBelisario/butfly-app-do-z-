export interface RawCustomers {
  uid: number
  name: string
  surname: string
  createdAt: string
}

export interface FormattedCustomers {
  name: string
  surname: string
  createdAt: Date
}
