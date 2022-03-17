import { Box } from '@mui/material'
import { IconType } from 'react-icons'
import { FormattedProducts, Products } from '../types/products'
import { getCategory } from '../utils/getCategory'

export function productMapper(products: Products[]) {
  const productsFormatted: FormattedProducts[] = []
  products.forEach(product => {
    const { Icon }: { Icon: IconType; title: string } = getCategory(product.category)
    productsFormatted.push({
      ...product,
      name: (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Icon style={{ marginRight: 12, fontSize: 24, opacity: 0.8 }} />
          {product.name}
        </Box>
      ),
    })
  })
  return productsFormatted
}
