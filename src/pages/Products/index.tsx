import { Box, Typography, useTheme } from '@mui/material'
import { ProductsTable } from './ProductsTable'

export function Products() {
  const { palette } = useTheme()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
      <Typography ml={2} mt={2} variant="h1" fontSize="28px" fontWeight="normal" sx={{ color: palette.text.primary }}>
        Produtos
      </Typography>
      <Typography ml={2} mt={2} sx={{ fontSize: '16px', color: palette.text.secondary, fontWeight: 'light' }}>
        Gerencie e controle seus produtos de forma simples.
      </Typography>
      <ProductsTable />
    </Box>
  )
}
