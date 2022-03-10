import { Box, BoxProps } from '@mui/material'
import { useState } from 'react'
import { RemoveProduct } from './Modals/RemoveProduct'
import { ProductCard } from './ProductCard'

interface ProductProps {
  id: string
  name: string
  quantity?: string
  price?: number
}

export function ProductList(props: BoxProps) {
  const [removeProductModalIsOpen, setRemoveProductModalIsOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null)

  function openRemoveProductModal(product?: ProductProps) {
    if (!removeProductModalIsOpen && product) setSelectedProduct(product)
    setRemoveProductModalIsOpen(!removeProductModalIsOpen)
  }

  const [products] = useState<ProductProps[]>([
    { id: 'unique', name: 'Produto um' },
    { id: 'unique 2', name: 'Produto dois' },
    { id: 'unique 3', name: 'Produto tres' },
    { id: 'unique 4', name: 'Produto quatro' },
    { id: 'unique 5', name: 'Produto cinco' },
    { id: 'unique 6', name: 'Produto seis' }
  ])
  return (
    <Box {...props}>
      {products.map((product) => (
        <ProductCard sx={{ mb: 2 }} key={product.id} product={product} onRemoveProduct={openRemoveProductModal} />
      ))}

      <RemoveProduct product={selectedProduct} open={removeProductModalIsOpen} handleSetOpen={openRemoveProductModal} />
    </Box>
  )
}
