import { Box, Button, Typography, useTheme } from '@mui/material'
import { createContext, useState } from 'react'
import { ContentCard } from '../../components/ContentCard'
import { NewProduct } from './NewProduct'
import { ProductList } from './ProductList'
import { ProductListProps } from './types/products'

interface CheckoutContext {
  products: ProductListProps[]
  selectedProduct: ProductListProps | null
  addProduct: (data: ProductListProps) => void
  removeProduct: (id: string) => void
  setSelectedProduct: (product: ProductListProps) => void
}

export const CheckoutContext = createContext<CheckoutContext>({
  products: [],
  addProduct: data => void data,
  removeProduct: (id: string) => void id,
  selectedProduct: null,
  setSelectedProduct: (product: ProductListProps) => void product
})

export function Checkout() {
  const { palette } = useTheme()
  const [products, setProducts] = useState<ProductListProps[]>([])
  const [selectedProduct, setSelectedProduct] = useState<ProductListProps | null>(null)

  function addProduct(data: ProductListProps) {
    setProducts([...products, data])
  }

  function removeProduct(id: string) {
    const newProductArray = products.filter(({ product }) => product.uid !== id)
    setProducts(newProductArray)
  }

  return (
    <CheckoutContext.Provider value={{ products, addProduct, removeProduct, selectedProduct, setSelectedProduct }}>
      <Box>
        <Typography ml={2} mt={2} variant="h1" fontSize="28px" fontWeight="normal" sx={{ color: palette.text.primary }}>
          Frente de caixa
        </Typography>
        <Typography
          ml={2}
          mt={2}
          sx={{ fontSize: '16px', color: palette.text.secondary, fontWeight: 'light', }}
        >
          Mais agilidade na venda de seus produtos 🕺
        </Typography>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} mt={3} height="100%">
        <ContentCard flex={{ xs: 1, md: 0.5 }} mr={{ xs: 0, lg: 2 }}>
          <NewProduct />
        </ContentCard>
        <ContentCard display="flex" flexDirection="column" flex={{ xs: 1, lg: 0.5 }} mt={{ xs: 2, lg: 0 }} overflow="scroll" boxSizing="border-box">
          <ProductList sx={{ flexBasis: '100%', flexGrow: 1 }} />
          <Button variant="contained" sx={{ alignSelf: "flex-end" }}>
            Continuar
          </Button>
        </ContentCard>
      </Box>
    </CheckoutContext.Provider>
  )
}
