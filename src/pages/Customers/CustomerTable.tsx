import { Box, Button, Grid, InputBase, useTheme } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { HiPlusSm } from 'react-icons/hi'
import { IoSearch } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { useDebouncedCallback } from 'use-debounce'
import { ContentCard } from '../../components/ContentCard'
import { ExportButton } from '../../components/ExportButton'
import { TableComponent } from '../../components/Table'
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
  const [search, setSearch] = useState()

  const navigate = useNavigate()

  const fetchData = async () => {
    const selectedCompany = localStorage.getItem('@Butfly:companyUid')
    if (totalPages && page >= totalPages) return
    await ApiInstance.get(`/companies/${selectedCompany}/customers`, {
      params: { page: !page ? 1 : Number(page) + 1, search, include: '(phones;emails)' },
      headers: { authorization: `Bearer ${localStorage.getItem('@Butfly:token')}` }
    })
      .then(response => {
        const newCustomers = response.data.rows
        setPage(response.data.page)
        setTotalPages(response.data.totalPages)
        setCustomers([...customers, ...CustomerMapper(newCustomers)])
      })
      .catch(error => {
        console.log('error', error)
      })
  }

  const handleClickRow = (data: { [field: string]: string | number }) => {
    navigate(`/clientes/${data.uid}`)
  }

  useEffect(() => {
    fetchData()
  }, [search])

  function filterCustomer(event) {
    const { value } = event.target
    setPage(0)
    setCustomers([])
    setSearch(value)
  }

  return (
    <Box height="100%" display={'flex'} flexGrow="1" flexDirection={'column'}>
      <Box mb={2} mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={2} md={3} lg={6}>
            <ExportButton title="Exportar clientes" onCsvExport={() => console.log('CSV')} onPdfExport={() => console.log('PDF')} />
          </Grid>
          <Grid item xs={8} md={7} lg={5}>
            <InputBase
              fullWidth
              startAdornment={<IoSearch style={{ marginRight: 8 }} />}
              placeholder="Pesquise um cliente..."
              sx={{ borderRadius: '12px', px: 2, background: palette.background.paper, color: palette.text.primary }}
              onChange={useDebouncedCallback(filterCustomer, 500)}
            />
          </Grid>

          <Grid item xs={2} md={2} lg={1}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              style={{ height: 46, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)' }}
              onClick={() => navigate('/clientes/novo-cliente')}
            >
              <HiPlusSm size={22} />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ContentCard sx={{ p: 0, display: 'flex', overflow: 'hidden', flexGrow: 1 }}>
        <TableComponent rows={customers} columns={columns} style={{ height: '100%' }} fetchMore={fetchData} onClickRow={handleClickRow} />
      </ContentCard>
    </Box>
  )
}
