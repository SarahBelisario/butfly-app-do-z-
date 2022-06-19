import React from 'react'
import { PageContainer } from '../../components/PageContainer'
import { CustomerTable } from './CustomerTable'

export function Customers() {
  return (
    <PageContainer mainText="Clientes" secondaryText="Seus clientes">
      <CustomerTable />
    </PageContainer>
  )
}
