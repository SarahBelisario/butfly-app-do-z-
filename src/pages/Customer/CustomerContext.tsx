import React, { useState, createContext, Dispatch, SetStateAction } from 'react'

export type CustomerContextType = {
  uid: string
  name: string
  email: string
  surname?: string
  observations?: string
  createdAt: Date
  addresses: {
    city: string
    state: string
    neighborhood: string
    street: string
    number: string
    complement?: string
    uid: string
  }[]
  phones: { uid: string; phone: string }[]
}

export const CustomerContext = createContext<{ customer: CustomerContextType; setCustomer: Dispatch<SetStateAction<CustomerContextType>> }>({
  customer: { addresses: [], createdAt: new Date(), observations: '', phones: [], name: '', email: '', surname: '', uid: '' },
  setCustomer: () => {}
})

export function CustomerProvider({ children }) {
  const [customer, setCustomer] = useState<CustomerContextType>({
    uid: '',
    name: '',
    email: '',
    surname: '',
    addresses: [],
    createdAt: new Date(),
    observations: '',
    phones: []
  })
  return <CustomerContext.Provider value={{ customer, setCustomer }}>{children}</CustomerContext.Provider>
}
