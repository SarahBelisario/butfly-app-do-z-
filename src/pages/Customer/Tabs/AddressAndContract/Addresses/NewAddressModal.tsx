import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import { ApiInstance } from '@services/axios'
import { ViaCepInstance } from '@services/cep'
import { AddressType, CustomerType } from '../../../../../types/GlobalProps'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactInputMask from 'react-input-mask'
import { toast } from 'react-toastify'
import { MaskedInput } from '@components/Inputs/MaskedInput'

export function NewAddressModal({
  isOpen,
  customer,
  setCustomer,
  onClose
}: {
  isOpen: boolean
  customer: CustomerType
  setCustomer: (customer: CustomerType) => void
  onClose: VoidFunction
}) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors }
  } = useForm({
    defaultValues: {
      uid: '',
      zipCode: '',
      neighborhood: '',
      complement: '',
      street: '',
      state: '',
      city: '',
      number: ''
    }
  })
  const [focusedInput, setFocusedInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const zipCode = watch('zipCode')
    if (zipCode?.length === 9) {
      ViaCepInstance(`${zipCode}/json`).then((response: { data: any }) => {
        setValue('neighborhood', response.data.bairro || '')
        setValue('complement', response.data.complemento || '')
        setValue('street', response.data.logradouro || '')
        setValue('state', response.data.uf || '')
        setValue('city', response.data.localidade || '')
      })
    }
  }, [watch('zipCode')])

  function handleCheckFocus(field: any): boolean {
    return focusedInput === field || watch(field) ? true : false
  }

  async function handleStoreAddress(data: AddressType) {
    const companyUid = localStorage.getItem('@Butfly:companyUid')

    await ApiInstance.post(
      `/companies/${companyUid}/customers/${customer?.uid}/addresses`,
      {
        zipCode: data.zipCode,
        city: data.city,
        state: data.state,
        neighborhood: data.neighborhood,
        street: data.street,
        number: data.number,
        complement: data.complement
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
          complement: response.data.complement
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
                name="zipCode"
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
                    InputLabelProps={{ shrink: handleCheckFocus('zipCode') }}
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
                InputLabelProps={{ shrink: handleCheckFocus('city') }}
                required
              />
            </Grid>
            <Grid item xs={3} md={2}>
              <TextField
                fullWidth
                label="UF"
                {...register('state')}
                onFocus={() => setFocusedInput('state')}
                onBlur={() => setFocusedInput('')}
                InputLabelProps={{ shrink: handleCheckFocus('state') }}
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
                InputLabelProps={{ shrink: handleCheckFocus('neighborhood') }}
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
                InputLabelProps={{ shrink: handleCheckFocus('street') }}
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
                InputLabelProps={{ shrink: handleCheckFocus('number') }}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Complemento"
                {...register('complement')}
                onFocus={() => setFocusedInput('complement')}
                onBlur={() => setFocusedInput('')}
                InputLabelProps={{ shrink: handleCheckFocus('complement') }}
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
