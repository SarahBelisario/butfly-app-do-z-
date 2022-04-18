export interface RawCustomers {
  uid: number
  name: string
  email: string
  phone: string
  address: string
  createdAt: string
  updatedAt: string
}

export interface FormattedCustomers {
  name: string
  email: string
  phone: string
  createdAt: string
  contact: JSX.Element
}
