import { Box, BoxProps, Typography, useMediaQuery, useTheme } from '@mui/material'

interface PageContainerProps extends BoxProps {
  mainText: string
  secondaryText: string
}

export function PageContainer({ children, mainText, secondaryText, ...props }: PageContainerProps) {
  const { palette } = useTheme()
  const isMobile = useMediaQuery('(max-width:600px)')
  return (
    <Box id="pageContainer" sx={{ h: '100%', p: isMobile ? 2 : 6 }}>
      <Typography ml={2} mt={2} variant="h1" fontSize="28px" fontWeight="normal" sx={{ color: palette.text.primary }}>
        {mainText}
      </Typography>
      <Typography ml={2} mt={2} sx={{ fontSize: '16px', color: palette.text.secondary, fontWeight: 'light' }}>
        {secondaryText}
      </Typography>
      {children}
    </Box>
  )
}
