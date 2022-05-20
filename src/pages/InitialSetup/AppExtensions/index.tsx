import { LoadingButton } from '@mui/lab'
import { Box, Typography } from '@mui/material'
import { FaCheck } from 'react-icons/fa'

export function AppExtensions({ step, isLoading }: { step: number; isLoading: boolean }) {
  return (
    <Box sx={{ width: '80%' }} maxWidth={600}>
      <Typography color="lightgray" fontSize={20} mb={1}>
        Dica especial
      </Typography>
      <Typography color="lightgray" sx={{ opacity: 0.8 }}>
        Você pode utilizar extensões para adaptar nossa plataforma ao seu modelo de negócio ou melhorar sua experiência.
      </Typography>

      <LoadingButton
        loading={isLoading}
        disabled={step !== 3}
        variant="contained"
        size="large"
        color="success"
        sx={{ color: 'whitesmoke', mt: 4 }}
        type="submit"
        form="finishStep"
      >
        Finalizar <FaCheck style={{ marginLeft: 8 }} />
      </LoadingButton>
    </Box>
  )
}
