import { Box } from '@mui/material'
import { BoxProps } from '@mui/system'
import React from 'react'

export function ContentCard(props: BoxProps) {
  return (
    <Box
      {...props}
      sx={{
        ...props.sx,
        borderRadius: 8,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
      }}
    >
      {props.children}
    </Box>
  )
}
