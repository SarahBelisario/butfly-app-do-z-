import { Box, Button, Typography, useTheme } from '@mui/material'
import { ContentCard } from '../../components/ContentCard'
import { NewProduct } from './NewProduct'
import { ProductList } from './ProductList'

export function Checkout() {
  const { palette } = useTheme()
  return (
    <>
      <Box>
        <Typography ml={2} mt={2} variant="h1" fontSize="28px" fontWeight="normal" sx={{ color: palette.text.primary }}>
          Frente de caixa
        </Typography>
        <Typography ml={2} mt={2} sx={{ fontSize: '16px', color: palette.text.secondary, fontWeight: 'light' }}>
          Mais agilidade na venda de seus produtos 🕺
        </Typography>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column-reverse', md: 'row' }} mt={3} height="100%">
        <ContentCard
          display="flex"
          flexDirection="column"
          flex={{ xs: 1, md: 0.3 }}
          mr={{ xs: 0, md: 2 }}
          mt={{ xs: 2, md: 0 }}
          overflow="scroll"
          boxSizing="border-box"
        >
          <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary} mb={4}>
            Produtos adicionados
          </Typography>
          <ProductList sx={{ flexBasis: '100%', flexGrow: 1 }} />
          <Button variant="contained" fullWidth>
            Finalizar
          </Button>
        </ContentCard>
        <ContentCard flex={{ xs: 1, md: 0.7 }}>
          <NewProduct />
        </ContentCard>
      </Box>
    </>
  )
}
