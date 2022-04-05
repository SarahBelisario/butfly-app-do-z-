import { Box, Button, ButtonBase, InputBase, Paper, TextField, Typography, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import { ContentCard } from '../../components/ContentCard'
import Table from '../../components/Table'
import { ApiInstance } from '../../services/axios'
import { productMapper } from './resolver/ProductMapper'
import { FormattedProducts } from './types/products'
import { useNavigate } from 'react-router-dom'
import { IoCalendar, IoChevronDown, IoDocumentText, IoFilter, IoFilterCircleSharp, IoSearch } from 'react-icons/io5'
import { HiPlusSm } from 'react-icons/hi'

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
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
      <Typography ml={2} mt={2} variant="h1" fontSize="28px" fontWeight="normal" sx={{ color: palette.text.primary }}>
        Produtos
      </Typography>
      <Typography ml={2} mt={2} sx={{ fontSize: '16px', color: palette.text.secondary, fontWeight: 'light' }}>
        Gerencie e controle seus produtos de forma simples.
      </Typography>
      <Box mb={2} mt={3} display="flex" justifyContent="space-between">
        <Box>
          <Button sx={{ background: '#fff', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)', height: 46 }}>
            <IoFilter style={{ marginRight: 8 }} color={palette.text.primary} />{' '}
            <Typography color={palette.text.primary} fontSize={14}>
              {' '}
              Filtrar
            </Typography>
            <IoChevronDown style={{ marginLeft: 4 }} color={palette.text.primary} />
          </Button>
        </Box>

        <Box style={{ display: 'flex' }}>
          <Box style={{ marginLeft: 12, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)' }}>
            <InputBase
              startAdornment={<IoSearch style={{ marginRight: 8 }} />}
              placeholder="Faça sua pesquisa..."
              sx={{ borderRadius: '12px', px: 2, background: '#fff', color: palette.text.primary }}
            />
          </Box>
          <Box style={{ marginLeft: 12 }}>
            <Button style={{ height: 46, background: '#fff', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)' }}>
              <IoCalendar size={20} color={palette.text.primary} />
              <IoChevronDown style={{ marginLeft: 4 }} color={palette.text.primary} />
            </Button>
          </Box>
          <Box style={{ marginLeft: 12 }}>
            <Button style={{ height: 46, background: '#fff', boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)' }}>
              <IoDocumentText color={palette.text.primary} size={22} />
              <IoChevronDown color={palette.text.primary} style={{ marginLeft: 4 }} />
            </Button>
          </Box>
          <Box style={{ marginLeft: 12 }}>
            <Button color="primary" variant="contained" style={{ height: 46, boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.05)' }}>
              <HiPlusSm size={22} />
            </Button>
          </Box>
        </Box>
      </Box>
      <ContentCard sx={{ p: 0, height: '100%', overflow: 'hidden' }}>
        <Table rows={productMapper(products)} columns={columns} fetchMore={fetchData} onClickRow={handleClickRow} />
      </ContentCard>
    </Box>
  )
}
