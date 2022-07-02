import { useTheme } from '@mui/material'
import { createTable } from '@tanstack/react-table'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableComponent } from '../../components/TanstackTable'
import { ApiInstance } from '../../services/axios'
import { CustomerMapper } from './Mapper/CustomerMapper'
import { FormattedCustomers } from './Types/Customers'

const columns: { field: string; label: string; type?: 'currency' | 'date' | 'datetime'; hidden?: boolean }[] = [
  { field: 'id', label: 'Id', hidden: true },
  { field: 'uid', label: 'Uid', hidden: true },
  { field: 'name', label: 'Nome' },
  { field: 'surname', label: 'Apelido' },
  { field: 'createdAt', label: 'Cadastro', type: 'datetime' }
]

export function CustomerTable() {
  const [customers, setCustomers] = useState<FormattedCustomers[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(null)
  const { palette } = useTheme()
  const [search, setSearch] = useState<string | undefined>()

  const navigate = useNavigate()

  const fetchData = async () => {
    const selectedCompany = localStorage.getItem('@Butfly:companyUid')
    if (totalPages && page >= totalPages) return
    await ApiInstance.get(`/companies/${selectedCompany}/customers`, {
      params: { page: !page ? 1 : Number(page) + 1, search, include: '(phones;emails)' },
      headers: { authorization: `Bearer ${localStorage.getItem('@Butfly:token')}` }
    }).then(response => {
      const newCustomers = response.data.rows
      setPage(response.data.page)
      setTotalPages(response.data.totalPages)
      setCustomers([...customers, ...CustomerMapper(newCustomers)])
    })
  }

  const searchFunction = async () => {
    setCustomers([])
    setPage(0)
    setTotalPages(null)
    await fetchData()
  }

  const handleClickRow = (data: { [field: string]: string | number }) => {
    navigate(`/clientes/${data.uid}`)
  }

  useEffect(() => {
    fetchData()
  }, [search])

  function filterData(search?: string) {
    setPage(0)
    setCustomers([])
    setSearch(search)
  }

  const table = createTable().setRowType<FormattedCustomers>()
  const columns = [
    table.createDataColumn('name', {
      header: 'Nome'
    }),
    table.createDataColumn('surname', {
      header: 'Apelido'
    }),
    table.createDataColumn('createdAt', {
      header: 'Cadastro'
    })
  ]

  return (
    <TableComponent
      table={table}
      columns={columns}
      rows={customers}
      fetchMoreResults={fetchData}
      filterResults={filterData}
      onRowClick={handleClickRow}
    />
  )
}
