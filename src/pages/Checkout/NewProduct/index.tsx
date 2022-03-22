import { Box, Button, Grid, InputAdornment, MenuItem, Select, TextField, Typography, useTheme } from '@mui/material'
import { SyntheticEvent, useContext, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import NumberFormat from 'react-number-format'
import { CheckoutContext } from '..'
import { AsyncAutoComplete } from '../../../components/AsyncAutoComplete'
import { ApiInstance } from '../../../services/axios'
import { ProductProps } from '../types/products'

export function NewProduct() {
  const { palette } = useTheme()
  const [product, setProduct] = useState<ProductProps | null>(null)
  const [products, setProducts] = useState([])
  const [amount, setAmount] = useState()
  const [quantity, setQuantity] = useState()
  const [discount, setDiscount] = useState()
  const [discountType, setDiscountType] = useState('')
  const [, setProductLoading] = useState(false)
  const { handleSubmit, control, reset, register } = useForm()
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

  function addProductAndResetForm(data) {
    if (!product) return
    const addProductData = {
      quantity: Number(data.quantity.replace(',', '.')),
      amount: Number(data.amount.replace(',', '.')),
      discount: Number(data.discount.replace(',', '.')),
      product: product
    }
    addProduct(addProductData)
  }

  function currencyFormatter(value) {
    if (!Number(value)) return ''
    const amount = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value / 100)
    return `${amount}`.replace(/[^0-9,]/gi, '')
  }

  function handleChangeProduct(data) {
    setProduct(data)
  }
  return (
    <Box component={'form'} onSubmit={handleSubmit(addProductAndResetForm)} display="flex" flexDirection="column">
      <Box display="flex" mb={4}>
        <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary}>
          Informações da venda
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AsyncAutoComplete
            isRequired
            value={product}
            onChange={handleChangeProduct}
            label="Produto"
            data={products}
            setData={setProducts}
            fetchData={fetchProducts}
          />
        </Grid>

        <Grid item xs={6}>
          <NumberFormat
            name="amount"
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
            onChange={e => setAmount(e.target.value)}
            allowLeadingZeros={true}
            format={currencyFormatter}
            fullWidth
            required
            allowNegative={false}
            customInput={TextField}
          />
        </Grid>

        <Grid item xs={6}>
          <NumberFormat
            name="quantity"
            label="Quantidade"
            required
            fullWidth
            decimalScale={2}
            decimalSeparator={','}
            fixedDecimalScale
            onChange={e => setQuantity(e.target.value)}
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
        </Grid>

        <Grid item xs={3}>
          <Select fullWidth {...register('discountType')} defaultValue="percentage" onChange={(e: any) => setDiscountType(e.target?.value)}>
            <MenuItem value={'percentage'}>%</MenuItem>
            <MenuItem value={'money'}>R$</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={9}>
          <NumberFormat
            name="discount"
            label="Desconto"
            onChange={e => setDiscount(e.target.value)}
            fullWidth
            decimalScale={1}
            decimalSeparator={','}
            allowNegative={false}
            isAllowed={({ floatValue }) => (floatValue ? floatValue : 0) <= 100}
            fixedDecimalScale
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography fontSize={12}>{discountType === 'money' ? 'R$' : '%'}</Typography>
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
