import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import { ApiInstance } from '@services/axios'
import { ViaCepInstance } from '@services/cep'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import { toast } from 'react-toastify'

const MaskedInput = props => <ReactInputMask {...props}>{inputProps => <TextField {...inputProps} />}</ReactInputMask>
export function NewAddressModal({ isOpen, customer, setCustomer, onClose }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors }
  } = useForm()
  const [focusedInput, setFocusedInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const zipCode = watch('zipCode')
    if (zipCode?.length === 9) {
      ViaCepInstance(`${zipCode}/json`).then((response: { data: any }) => {
        setValue('neighborhood', response.data.bairro || '')
        setValue('additionalInfo', response.data.complemento || '')
        setValue('street', response.data.logradouro || '')
        setValue('uf', response.data.uf || '')
        setValue('city', response.data.localidade || '')
      })
    }
  }, [watch('zipCode')])

  async function handleStoreAddress(data) {
    const companyUid = localStorage.getItem('@Butfly:companyUid')

    await ApiInstance.post(
      `/companies/${companyUid}/customers/${customer?.uid}/addresses`,
      {
        zipCode: data.zipCode,
        city: data.city,
        state: data.uf,
        neighborhood: data.neighborhood,
        street: data.street,
        number: data.number,
        additionalInfo: data.additionalInfo
      },
      {
        headers: { authorization: 'Bearer ' + localStorage.getItem('@Butfly:token') }
      }
    )
      .then(response => {
        setIsLoading(false)
        onClose()
        const address = {
          uid: response.data.uid,
          city: response.data.city,
          state: response.data.state,
          neighborhood: response.data.neighborhood,
          street: response.data.street,
          number: response.data.number,
          zipCode: response.data.zipCode,
          additionalInfo: response.data.complement
        }
        setCustomer({ ...customer, addresses: [...customer.addresses, address] })
      })
      .catch(error => {
        setIsLoading(false)
        toast(`Erro ao cadastrar o endereço.`, { type: 'error' })
      })
  }

  return (
    <Dialog open={isOpen} maxWidth={'xs'} onClose={onClose}>
      <DialogTitle>Cadastro de endereço</DialogTitle>
      <DialogContent>
        <form id="address-form" onSubmit={handleSubmit(handleStoreAddress)}>
          <Grid container spacing={1} mt={0}>
            <Grid item xs={12} md={4}>
              <Controller
                {...register('zipCode')}
                control={control}
                defaultValue=""
                render={({ field: { value, onChange } }) => (
                  <MaskedInput
                    required
                    fullWidth
                    error={!!errors.zipCode}
                    helperText={errors.zipCode?.message}
                    value={value || ''}
                    onFocus={() => setFocusedInput('zipCode')}
                    onBlur={() => setFocusedInput('')}
                    InputLabelProps={{ shrink: focusedInput === 'zipCode' || watch('zipCode') }}
                    onChange={onChange}
                    mask="99999-999"
                    maskChar=""
                    label="CEP"
                  />
                )}
              />
            </Grid>
            <Grid item xs={9} md={6}>
              <TextField
                fullWidth
                label="Cidade"
                {...register('city')}
                onFocus={() => setFocusedInput('city')}
                onBlur={() => setFocusedInput('')}
                InputLabelProps={{ shrink: focusedInput === 'city' || watch('city') }}
                required
              />
            </Grid>
            <Grid item xs={3} md={2}>
              <TextField
                fullWidth
                label="UF"
                {...register('uf')}
                onFocus={() => setFocusedInput('uf')}
                onBlur={() => setFocusedInput('')}
                InputLabelProps={{ shrink: focusedInput === 'uf' || watch('uf') }}
                required
              />
            </Grid>
            <Grid item xs={12} md={12}>
              <TextField
                fullWidth
                label="Bairro"
                {...register('neighborhood')}
                onFocus={() => setFocusedInput('neighborhood')}
                onBlur={() => setFocusedInput('')}
                InputLabelProps={{ shrink: focusedInput === 'neighborhood' || watch('neighborhood') }}
                required
              />
            </Grid>
            <Grid item xs={9}>
              <TextField
                fullWidth
                label="Logradouro"
                {...register('street')}
                onFocus={() => setFocusedInput('street')}
                onBlur={() => setFocusedInput('')}
                InputLabelProps={{ shrink: focusedInput === 'street' || watch('street') }}
                required
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                label="Nº"
                {...register('number')}
                onFocus={() => setFocusedInput('number')}
                onBlur={() => setFocusedInput('')}
                InputLabelProps={{ shrink: focusedInput === 'number' || watch('number') }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Complemento"
                {...register('additionalInfo')}
                onFocus={() => setFocusedInput('additionalInfo')}
                onBlur={() => setFocusedInput('')}
                InputLabelProps={{ shrink: focusedInput === 'additionalInfo' || watch('additionalInfo') }}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} onClick={onClose}>
          Cancelar
        </Button>
        <LoadingButton loading={isLoading} variant="contained" color="primary" type="submit" form="address-form">
          Cadastrar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
