import { Box, Button, Typography, useTheme } from '@mui/material'
import { createContext, useState } from 'react'
import { ContentCard } from '../../components/ContentCard'
import { NewProduct } from './NewProduct'
import { ProductList } from './ProductList'
import { ProductListProps } from './types/products'
import { toast } from 'react-toastify'
import { AdditionalInfo } from './AdditionalInfo'
import { AddressProps } from './types/address'

interface CheckoutContext {
  products: ProductListProps[]
  selectedProduct: ProductListProps | null
  addProduct: (data: ProductListProps) => void
  removeProduct: (id: string) => void
  setSelectedProduct: (product: ProductListProps) => void
  step: number
  setStep: (step: number) => void
  address: AddressProps | null
  setAddress: (address: AddressProps | null) => void
}

export const CheckoutContext = createContext<CheckoutContext>({
  products: [],
  addProduct: data => void data,
  removeProduct: (id: string) => void id,
  selectedProduct: null,
  setSelectedProduct: (product: ProductListProps) => void product,
  step: 1,
  setStep: (step: number) => void step,
  address: null,
  setAddress: (address: AddressProps | null) => void address
})

export function Checkout() {
  const { palette } = useTheme()
  const [products, setProducts] = useState<ProductListProps[]>([])
  const [selectedProduct, setSelectedProduct] = useState<ProductListProps | null>(null)
  const [address, setAddress] = useState<AddressProps | null>(null)
  const [step, setStep] = useState<number>(1)

  function addProduct(data: ProductListProps) {
    if (products.find(product => product.product.uid === data.product.uid)) return toast.error('O produto informado ja existe.')
    setProducts([...products, data])
  }

  function removeProduct(id: string) {
    const newProductArray = products.filter(({ product }) => product.uid !== id)
    setProducts(newProductArray)
  }

  return (
    <CheckoutContext.Provider
      value={{ products, addProduct, removeProduct, selectedProduct, setSelectedProduct, step, setStep, address, setAddress }}
    >
      <Box>
        <Typography ml={2} mt={2} variant="h1" fontSize="28px" fontWeight="normal" sx={{ color: palette.text.primary }}>
          Frente de caixa
        </Typography>
        <Typography ml={2} mt={2} sx={{ fontSize: '16px', color: palette.text.secondary, fontWeight: 'light' }}>
          Mais agilidade na venda de seus produtos 🕺
        </Typography>
      </Box>

      <Box display="flex" flexDirection={{ xs: 'column', lg: 'row' }} mt={3} height="100%">
        {step === 1 && (
          <ContentCard flex={{ xs: 1, md: 0.5 }} mr={{ xs: 0, lg: 2 }}>
            <NewProduct />
          </ContentCard>
        )}

        {step === 2 && (
          <ContentCard flex={{ xs: 1, md: 0.5 }} mr={{ xs: 0, lg: 2 }}>
            <AdditionalInfo />
          </ContentCard>
        )}
        <ContentCard display="flex" flexDirection="column" flex={{ xs: 1, lg: 0.5 }} mt={{ xs: 2, lg: 0 }} overflow="scroll" boxSizing="border-box">
          <ProductList sx={{ flexBasis: '100%', flexGrow: 1 }} />
        </ContentCard>
      </Box>
    </CheckoutContext.Provider>
  )
}
