import { InputAdornment, TextField, Typography } from '@mui/material'
import NumberFormat from 'react-number-format'

interface CurrencyInputProps {
  value: number | undefined
  onChange: (event: any, value: number) => void
}

export function CurrencyInput({ value, onChange, ...props }: CurrencyInputProps) {
  function currencyFormatter(value: string) {
    if (!Number(value)) return ''
    const amount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(Number(value) / 100)
    return `${amount}`.replace(/[^0-9,]/gi, '')
  }

  return (
    <NumberFormat
      decimalScale={2}
      decimalSeparator={','}
      fixedDecimalScale
      allowLeadingZeros={true}
      format={currencyFormatter}
      allowNegative={false}
      customInput={TextField}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Typography fontSize={12}>R$</Typography>
          </InputAdornment>
        )
      }}
      {...props}
    />
  )
}
