import { Box, BoxProps, Typography, useTheme } from '@mui/material'
import { useContext, useState } from 'react'
import { CheckoutContext } from '..'
import { RemoveProduct } from './Modals/RemoveProduct'
import { ProductCard } from './ProductCard'
import { motion, AnimatePresence } from 'framer-motion'

export function ProductList(props: BoxProps) {
  const [removeProductModalIsOpen, setRemoveProductModalIsOpen] = useState(false)
  const { products } = useContext(CheckoutContext)
  const { palette } = useTheme()

  return (
    <Box {...props}>
      <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary} mb={4}>
        Produtos adicionados
      </Typography>
      <AnimatePresence initial={false}>
        {products.map((product, index) => (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ x: -300, opacity: 0 }}
          >
            <ProductCard sx={{ mb: 2 }} key={index} product={product} openRemoveProduct={setRemoveProductModalIsOpen} />
          </motion.div>
        ))}
      </AnimatePresence>
      <RemoveProduct open={removeProductModalIsOpen} setOpen={setRemoveProductModalIsOpen} />
    </Box>
  )
}
