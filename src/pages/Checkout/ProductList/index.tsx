import { Box, BoxProps } from '@mui/material'
import { useContext, useState } from 'react'
import { CheckoutContext } from '..'
import { RemoveProduct } from './Modals/RemoveProduct'
import { ProductCard } from './ProductCard'

export function ProductList(props: BoxProps) {
  const [removeProductModalIsOpen, setRemoveProductModalIsOpen] = useState(false)
  const { products } = useContext(CheckoutContext)

  return (
    <Box {...props}>
      {products.map((product, index) => (
        <ProductCard sx={{ mb: 2 }} key={index} product={product} openRemoveProduct={setRemoveProductModalIsOpen} />
      ))}
      <RemoveProduct open={removeProductModalIsOpen} setOpen={setRemoveProductModalIsOpen} />
    </Box>
  )
}
