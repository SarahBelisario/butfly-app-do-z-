import { Box, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { ContentCard } from '../../components/ContentCard'
import Table from '../../components/Table'
import { ApiInstance } from '../../services/axios'
import { productMapper } from './resolver/ProductMapper'
import { FormattedProducts } from './types/products'
import { useNavigate } from 'react-router-dom'

const columns: { field: string; label: string; type?: 'currency' | 'date'; hidden?: boolean }[] = [
  { field: 'id', label: 'Id', hidden: true },
  { field: 'name', label: 'Nome' },
  { field: 'quantity', label: 'Quantidade' },
  { field: 'amount', label: 'Valor', type: 'currency' },
  { field: 'createdAt', label: 'Data de criação', type: 'date' }
]

export function Products() {
  const [products, setProducts] = useState<FormattedProducts[]>([])
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(null)
  const { palette } = useTheme()
  const navigate = useNavigate()

  const fetchData = async () => {
    if (totalPages && page >= totalPages) return
    await ApiInstance.get(`/products`, {
      params: {
        page: !page ? 1 : Number(page) + 1
      }
    })
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
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
      <Typography ml={2} mt={2} variant="h1" fontSize="28px" fontWeight="normal" sx={{ color: palette.text.primary }}>
        Produtos
      </Typography>
      <Typography ml={2} mt={2} sx={{ fontSize: '16px', color: palette.text.secondary, fontWeight: 'light' }}>
        Gerencie e controle seus produtos de forma simples.
      </Typography>
      <ContentCard mt={3} sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
        <Table rows={productMapper(products)} columns={columns} fetchMore={fetchData} onClickRow={handleClickRow} />
      </ContentCard>
    </Box>
  )
}
