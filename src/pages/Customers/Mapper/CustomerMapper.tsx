import { FormattedCustomers, RawCustomers } from '../Types/Customers'

export function CustomerMapper(data: RawCustomers[]): FormattedCustomers[] {
  const formattedData = data.map(customer => {
    return {
      uid: customer.uid,
      name: customer.name,
      surname: customer.surname,
      createdAt: new Date(customer.createdAt)
    }
  })

  return formattedData
}
