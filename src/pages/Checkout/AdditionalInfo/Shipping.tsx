import { Grid, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { useState } from 'react'
import ReactInputMask from 'react-input-mask'
import { toast } from 'react-toastify'
import { ViaCepInstance } from '../../../services/cep'

const MaskedInput = props => <ReactInputMask {...props}>{inputProps => <TextField {...inputProps} />}</ReactInputMask>
const UFList = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MS',
  'MT',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO'
]

export function Shipping() {
  const [cep, setCep] = useState('')
  const [number, setNumber] = useState('')
  const [neighborhood, setNeighborhood] = useState('')
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [city, setCity] = useState('')
  const [uf, setUf] = useState('')
  const [street, setStreet] = useState('')
  const handleChangeCep = async event => {
    const inputValue = event.target.value
    setCep(inputValue)
    if (inputValue.length === 9) {
      await ViaCepInstance.get(`${inputValue}/json`)
        .then(response => {
          const { bairro, complemento, localidade, logradouro, uf, erro } = response.data
          if (erro) return toast.warn('Endereço não encontrado, verifique o CEP informado')
          setNeighborhood(bairro)
          setAdditionalInfo(complemento)
          setCity(localidade)
          setStreet(logradouro)
          setUf(uf)
        })
        .catch(error => {
          toast.error('Erro de comunicação com o gateway, aguarde alguns instantes e tente novamente')
        })
    }
  }

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <MaskedInput required mask="99999-999" value={cep} maskChar="" label="CEP" fullWidth onChange={handleChangeCep} />
        </Grid>

        <Grid item xs={8}>
          <TextField
            label="Logradouro"
            value={street}
            onChange={e => setStreet(e.target.value)}
            InputLabelProps={{ shrink: street ? true : false }}
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <TextField label="Nº" value={number} fullWidth onChange={e => setNumber(e.target.value)} />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Complemento"
            value={additionalInfo}
            onChange={e => setAdditionalInfo(e.target.value)}
            InputLabelProps={{ shrink: additionalInfo ? true : false }}
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Bairro"
            value={neighborhood}
            onChange={e => setNeighborhood(e.target.value)}
            InputLabelProps={{ shrink: neighborhood ? true : false }}
            fullWidth
          />
        </Grid>

        <Grid item xs={8}>
          <TextField
            label="Cidade"
            value={city}
            onChange={e => setCity(e.target.value)}
            InputLabelProps={{ shrink: city ? true : false }}
            fullWidth
          />
        </Grid>

        <Grid item xs={4}>
          <Select value={uf} onChange={e => setUf(e.target.value)} fullWidth>
            {UFList.map(state => (
              <MenuItem value={state}>{state}</MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
    </Box>
  )
}
