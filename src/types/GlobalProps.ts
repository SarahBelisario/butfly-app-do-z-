export interface AddressType {
  zipCode: string
  city: string
  state: string
  neighborhood: string
  street: string
  number: string
  complement?: string
  uid: string
}

export interface PhoneType {
  uid: string
  phone: string
}

export interface CustomerType {
  uid: string
  name: string
  email: string
  surname?: string
  observations?: string
  createdAt: Date
  addresses: AddressType[]
  phones: PhoneType[]
}
