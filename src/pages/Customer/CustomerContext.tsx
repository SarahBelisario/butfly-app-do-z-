import React, { useState, createContext, Dispatch, SetStateAction } from 'react'

type CustomerContextType = {
  uid: string
  name: string
  surname?: string
  observations?: string
  createdAt: Date
  addresses: {}[]
  phones: { uid: string; phone: string }[]
  emails: { uid: string; email: string }[]
}

export const CustomerContext = createContext<{ customer: CustomerContextType; setCustomer: Dispatch<SetStateAction<CustomerContextType>> }>({
  customer: { addresses: [], createdAt: new Date(), emails: [], observations: '', phones: [], name: '', surname: '', uid: '' },
  setCustomer: () => {}
})

export function CustomerProvider({ children }) {
  const [customer, setCustomer] = useState<CustomerContextType>({
    uid: '',
    name: '',
    surname: '',
    addresses: [],
    createdAt: new Date(),
    emails: [],
    observations: '',
    phones: []
  })
  return <CustomerContext.Provider value={{ customer, setCustomer }}>{children}</CustomerContext.Provider>
}
