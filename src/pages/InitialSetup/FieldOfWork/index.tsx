import { Box, Button, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { useFormContext } from 'react-hook-form'
import { FaArrowRight } from 'react-icons/fa'

export function FieldOfWork({ nextStep }: { nextStep: () => void }) {
  const { register } = useFormContext()
  return (
    <Box sx={{ width: '90%' }}>
      <Typography color="lightgray">2. Qual das opções abaixo sua empresa mais se encaixa?</Typography>

      <Box mt={2} ml={2}>
        <RadioGroup {...register('fieldOfWork')}>
          <FormControlLabel sx={{ color: 'whitesmoke' }} value="products" control={<Radio color="success" />} label="Produtos em varejo" />
          <FormControlLabel sx={{ color: 'whitesmoke' }} value="food" control={<Radio color="success" />} label="Venda/Delivery de alimentos" />
          <FormControlLabel sx={{ color: 'whitesmoke' }} value="services" control={<Radio color="success" />} label="Prestação de serviços" />
          <FormControlLabel sx={{ color: 'whitesmoke' }} value="outro" control={<Radio color="success" />} label="Outros" />
        </RadioGroup>
      </Box>

      <Button variant="contained" size="large" color="success" sx={{ color: 'whitesmoke', mt: 4 }} onClick={nextStep}>
        Continuar <FaArrowRight style={{ marginLeft: 8 }} />
      </Button>
    </Box>
  )
}
