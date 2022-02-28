import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { ContentCard } from '../../components/ContentCard'
import Table from '../../components/Table'

export default function Products() {
  const { palette } = useTheme()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1, height: '100%' }}>
      <Typography ml={2} mt={2} variant="h1" fontSize="28px" fontWeight="normal" sx={{ color: palette.text.primary }}>
        Produtos
      </Typography>
      <Typography ml={2} mt={2} sx={{ fontSize: '16px', color: palette.text.secondary, fontWeight: 'light' }}>
        Gerencie e controle seus produtos de forma simples.
      </Typography>
      <ContentCard mt={3} sx={{ p: 0, height: '100%', overflow: 'hidden' }} >
        <Table />
      </ContentCard>
    </Box>
  )
}
