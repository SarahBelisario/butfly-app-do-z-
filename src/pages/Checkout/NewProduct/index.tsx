import { Box, Button, Collapse, Grid, Hidden, InputAdornment, MenuItem, Select, TextField, Typography, useTheme } from '@mui/material'
import { SyntheticEvent, useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { BiChevronDown } from 'react-icons/bi'
import NumberFormat from 'react-number-format'
import { CheckoutContext } from '..'
import { AsyncAutoComplete } from '../../../components/AsyncAutoComplete'
import { ApiInstance } from '../../../services/axios'
import { Delivery } from './DeliveryInfo'

export function NewProduct() {
  const { palette } = useTheme()
  const [products, setProducts] = useState([])
  const [, setProductLoading] = useState(false)
  const { handleSubmit, control } = useForm()
  const { addProduct } = useContext(CheckoutContext)

  async function fetchProducts(event: SyntheticEvent<Element, Event>, value: string) {
    setProductLoading(true)
    await ApiInstance.get(`products`, { params: { name: value } })
      .then(response => {
        setProducts(response.data.rows)
        setProductLoading(false)
      })
      .catch(() => {
        setProductLoading(false)
      })
  }

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    <Box component={'form'} onSubmit={handleSubmit(addProduct)} display="flex" flexDirection="column">
      <Box display="flex" mb={4}>
        <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary}>
          Informações da venda
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <AsyncAutoComplete
            isRequired
            control={control}
            label="Produto"
            name="product"
            data={products}
            setData={setProducts}
            fetchData={fetchProducts}
          />
        </Grid>

        <Grid item xs={6} >
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <NumberFormat
                {...field}
                label="Valor"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography fontSize={12}>R$</Typography>
                    </InputAdornment>
                  )
                }}
                decimalScale={2}
                decimalSeparator={','}
                fixedDecimalScale
                fullWidth
                required
                allowNegative={false}
                customInput={TextField}
              />
            )}
          />
        </Grid>

        <Grid item xs={6} >
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <NumberFormat
                {...field}
                label="Quantidade"
                required
                fullWidth
                decimalScale={2}
                decimalSeparator={','}
                fixedDecimalScale
                allowNegative={false}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Typography fontSize={12}>Un.</Typography>
                    </InputAdornment>
                  )
                }}
                customInput={TextField}
              />
            )}
          />
        </Grid>


        <Grid item xs={3}>
          <Select fullWidth>
            <MenuItem value={'percentage'}>%</MenuItem>
            <MenuItem value={'money'}>R$</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={9}>
          <NumberFormat
            label="Desconto"
            fullWidth
            decimalScale={1}
            decimalSeparator={','}
            allowNegative={false}
            isAllowed={({ floatValue }) => (floatValue ? floatValue : 0) <= 100}
            fixedDecimalScale
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography fontSize={12}>%</Typography>
                </InputAdornment>
              )
            }}
            customInput={TextField}
          />
        </Grid>
      </Grid>

      <Button variant="contained" sx={{ alignSelf: 'flex-end', mt: 2 }} type="submit">
        Adicionar produto
      </Button>
    </Box>
  )
}
