import { OutlinedTextFieldProps, TextField } from '@mui/material'
import { Control, Controller, useForm } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'

interface PhoneInput extends OutlinedTextFieldProps {
  name: string
  control: Control<any>
}

export function PhoneInput({ ...props }: PhoneInput) {
  const beforeMaskedValueChange = (newState: { value: string }) => {
    let { value } = newState

    const newValue = value.replace(/\D/g, '')
    if (newValue.length === 11) {
      value = newValue.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3')
    }

    return {
      ...newState,
      value
    }
  }

  return (
    <Controller
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value } }) => (
        <ReactInputMask
          mask={'(99) 9999-99999'}
          onChange={onChange}
          value={value}
          maskChar=""
          fullWidth
          beforeMaskedValueChange={beforeMaskedValueChange}
          {...props}
        >
          {/* @ts-ignore */}
          {inputProps => <TextField variant="outlined" name={props.name} {...inputProps} />}
        </ReactInputMask>
      )}
    />
  )
}
