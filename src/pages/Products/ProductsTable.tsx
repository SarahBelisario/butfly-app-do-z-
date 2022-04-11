import { Box, Grid, Hidden } from '@mui/material'
import { ContentCard } from 'components/ContentCard'
import { TableComponent } from 'components/Table'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ApiInstance } from 'services/axios'
import { ExportButton } from './ExportButton'
import { FilterButton } from './FilterButton'
import { NewProduct } from './NewProduct'
import { productMapper } from './Schemas/ProductMapper'
import { SearchInput } from './SearchInput'
import { FormattedProducts } from './Types/products'

const columns: { field: string; label: string; type?: 'currency' | 'date'; hidden?: boolean }[] = [
  { field: 'id', label: 'Id', hidden: true },
  { field: 'name', label: 'Nome' },
  { field: 'quantity', label: 'Quantidade' },
  { field: 'amount', label: 'Valor', type: 'currency' },
  { field: 'createdAt', label: 'Data de criação', type: 'date' }
]

export function ProductsTable() {
  const [products, setProducts] = useState<FormattedProducts[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(null)

  const navigate = useNavigate()

  const fetchData = async () => {
    if (totalPages && page >= totalPages) return
    await ApiInstance.get(`/products`, { params: { page: !page ? 1 : Number(page) + 1 } })
      .then(response => {
        const newProducts = response.data.rows
        setPage(response.data.page)
        setTotalPages(response.data.totalPages)
        setProducts([...products, ...newProducts])
      })
      .catch(error => {
        console.log('error', error)
      })
  }
  const handleClickRow = (data: { [field: string]: string | number }) => {
    navigate(`/produtos/${data.id}`)
  }

  useEffect(() => {
    fetchData()
  }, [])
  return (
    <>
      <Box mb={2} mt={3}>
        <Grid container spacing={2}>
          <Grid item xs={4} md={6} lg={2}>
            <FilterButton />
          </Grid>

          <Hidden lgDown>
            <Grid item lg={4} />
          </Hidden>

          <Grid item xs={12} lg={4} order={{ xs: 4, lg: 3 }}>
            <SearchInput />
          </Grid>

          <Grid item xs={8} md={6} lg={2} order={{ xs: 3, lg: 4 }}>
            <Grid container spacing={2}>
              {/**
              <Grid item xs={4}>
                <CalendarButton />
              </Grid>
               */}

              <Grid item xs={6}>
                <ExportButton />
              </Grid>

              <Grid item xs={6}>
                <NewProduct />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <ContentCard sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
        <TableComponent rows={productMapper(products)} columns={columns} fetchMore={fetchData} onClickRow={handleClickRow} />
      </ContentCard>
    </>
  )
}
