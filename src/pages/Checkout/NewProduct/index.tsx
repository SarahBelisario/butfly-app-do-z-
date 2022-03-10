import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Collapse,
  Grid,
  TextField,
  Typography,
  useTheme
} from '@mui/material'
import { ChangeEvent, SyntheticEvent, useState } from 'react'
import { BiChevronDown } from 'react-icons/bi'
import { useDebouncedCallback } from 'use-debounce'
import { ApiInstance } from '../../../services/axios'
import { Delivery } from './DeliveryInfo'

export function NewProduct() {
  const { palette } = useTheme()
  const [deliveryCollapsed, setDeliveryCollapsed] = useState(true)
  const [products, setProducts] = useState([])
  const [productLoading, setProductLoading] = useState(false)
  const [customers, setCustomers] = useState([])
  const [customerLoading, setCustomerLoading] = useState(false)
  async function fetchProducts(event: SyntheticEvent<Element, Event>, value: string) {
    setProductLoading(true)
    await ApiInstance.get(`products`, { params: { name: value } })
      .then((response) => {
        setProducts(response.data.rows)
        setProductLoading(false)
      })
      .catch(() => {
        setProductLoading(false)
      })
  }

  async function fetchCustomers(event: SyntheticEvent<Element, Event>, value: string) {
    setCustomerLoading(true)
    await ApiInstance.get(`customers`, { params: { name: value } })
      .then((response) => {
        setCustomers(response.data.rows)
        setCustomerLoading(false)
      })
      .catch(() => {
        setCustomerLoading(false)
      })
  }
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" mb={4}>
        <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary}>
          Informações da venda
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Autocomplete
            loading={productLoading}
            options={products}
            onInputChange={useDebouncedCallback(fetchProducts, 500)}
            getOptionLabel={(option: { name: string }) => option?.name}
            renderInput={(params) => (
              <TextField
                label="Produto"
                variant="outlined"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {productLoading ? <CircularProgress color="primary" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  )
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Autocomplete
            loading={customerLoading}
            options={customers}
            onInputChange={useDebouncedCallback(fetchCustomers, 500)}
            getOptionLabel={(option: { name: string }) => option?.name}
            renderInput={(params) => (
              <TextField
                label="Cliente"
                variant="outlined"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {productLoading ? <CircularProgress color="primary" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </>
                  )
                }}
              />
            )}
          ></Autocomplete>
        </Grid>
        <Grid item xs={3}>
          <TextField label="Valor" fullWidth />
        </Grid>
        <Grid item xs={3}>
          <TextField label="Quantidade" fullWidth />
        </Grid>

        <Grid item xs={6}></Grid>

        <Grid item xs={2}>
          <TextField label="Tipo de desconto" fullWidth />
        </Grid>

        <Grid item xs={4}>
          <TextField label="Desconto" fullWidth />
        </Grid>

        <Grid item xs={6}></Grid>
      </Grid>

      <Box mt={4} mb={4}>
        <Box
          display="flex"
          position="relative"
          justifyContent="space-between"
          alignItems="center"
          sx={{ cursor: 'pointer' }}
          onClick={() => setDeliveryCollapsed(!deliveryCollapsed)}
        >
          <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary}>
            Transporte/Frete
          </Typography>
          <Box display="flex" alignItems="center" height={0}>
            <BiChevronDown fontSize="18px" />
          </Box>
        </Box>
        <Collapse in={!deliveryCollapsed} timeout="auto" unmountOnExit>
          <Delivery />
        </Collapse>
      </Box>
      <Button variant="contained" sx={{ alignSelf: 'flex-end' }}>
        Adicionar produto
      </Button>
    </Box>
  )
}
