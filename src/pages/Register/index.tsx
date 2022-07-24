import { Box, Typography, useTheme } from '@mui/material'
import Form from './components/Form'
import LeftContainer from './LeftContainer'

export function Register() {
  const { palette } = useTheme()
  return (
    <Box p={0} display="flex" height="100vh" style={{ background: palette.background.default, overflow: 'hidden' }}>
      <LeftContainer />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ m: 1, mt: 2 }}
        flexDirection="column"
        width={{ base: '100%', sm: '50%', md: '60%', lg: '65%' }}
        flex="1"
        maxWidth="100%"
      >
        <Box display="flex" flexDirection={'column'} justifyContent={'center'} flex="1" mx={4}>
          <Typography color={palette.text.primary} fontWeight="light" textAlign="left" sx={{ ml: 1, mb: 0, fontSize: 24, fontWeight: 'light' }}>
            Inicie gratuitamente!
          </Typography>
          <Typography color={palette.text.secondary} fontWeight="light" textAlign="left" sx={{ ml: 1, mb: 1, fontSize: 14, fontWeight: 'light' }}>
            Não é necessário cadastro de cartão, na Butfly você inicia grátis mesmo.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', width: '350px', maxWidth: '90%', mx: 'auto' }}>
            <Form />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
