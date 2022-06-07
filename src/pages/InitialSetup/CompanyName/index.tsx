import { Box, Button, TextField, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { FaArrowRight } from 'react-icons/fa'

export function CompanyName({ nextStep }: { nextStep: () => void }) {
  const { register, watch } = useFormContext()

  return (
    <Box sx={{ width: '80%' }} maxWidth={600}>
      <Typography color="lightgray">1. Qual o nome de sua empresa?</Typography>
      <TextField
        fullWidth
        placeholder="Digite aqui o nome de sua empresa..."
        variant="standard"
        {...register('name')}
        sx={{
          color: '#fff',
          mt: 4,
          input: { color: 'whitesmoke', borderColor: 'whitesmoke', px: 2 },
          '& .MuiInput-underline:after': { borderColor: 'whitesmoke' },
          '& .MuiInput-underline:before': { borderColor: 'whitesmoke', opacity: 0.5 },
          '& .MuiFormLabel-root': { color: 'whitesmoke' }
        }}
      />
      <Button
        disabled={watch('name').length <= 3}
        onClick={nextStep}
        variant="contained"
        size="large"
        color="success"
        sx={{ color: 'whitesmoke', mt: 4 }}
      >
        Continuar <FaArrowRight style={{ marginLeft: 8 }} />
      </Button>
    </Box>
  )
}
