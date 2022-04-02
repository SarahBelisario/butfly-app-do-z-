import { Box, Button, Grid, InputAdornment, MenuItem, Select, TextField, Typography, useTheme } from '@mui/material'
import { SyntheticEvent, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import NumberFormat from 'react-number-format'
import { toast } from 'react-toastify'
import { AsyncAutoComplete } from '../../../components/AsyncAutoComplete'
import { ApiInstance } from '../../../services/axios'
import { CheckoutContext } from '../Contexts/CheckoutContext'
import { ProductListProps, ProductProps } from '../types/products'

export function NewProduct() {
  const { palette } = useTheme()
  const [product, setProduct] = useState<ProductProps | null>(null)
  const [products, setProducts] = useState([])
  const [amount, setAmount] = useState('')
  const [quantity, setQuantity] = useState('')
  const [discount, setDiscount] = useState('')
  const [discountType, setDiscountType] = useState<'money' | 'percentage'>('percentage')
  const [, setProductLoading] = useState(false)
  const { handleSubmit, register } = useForm()
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

  function addProductAndResetForm() {
    if (!product) return
    const addProductData: ProductListProps = {
      quantity: Number(quantity.replace(',', '.')),
      amount: Number(amount.replace(',', '.')),
      discount: Number(discount.replace(',', '.')),
      discountType: discountType,
      product: product
    }
    addProduct(addProductData)
    setProduct(null)
    setAmount('')
    setQuantity('')
    setDiscount('')
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
    if (!amount) setAmount(data.amount)
    if (!quantity) setQuantity('1')
  }

  function handleChangeDiscount(event) {
    const toNumber = value => Number(value.replace(',', '.'))
    const discountValue = toNumber(event.target.value)
    if (discountType === 'money' && discountValue > Number(amount)) {
      return setDiscount(amount)
    }
    if (discountType === 'percentage' && discountValue > 100) return setDiscount('100')

    setDiscount(event.target.value)
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
            value={amount}
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
            value={quantity}
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
          <Select
            fullWidth
            {...register('discountType')}
            defaultValue="percentage"
            value={discountType}
            onChange={(e: any) => setDiscountType(e.target?.value)}
          >
            <MenuItem value={'percentage'}>%</MenuItem>
            <MenuItem value={'money'}>R$</MenuItem>
          </Select>
        </Grid>

        <Grid item xs={9}>
          <NumberFormat
            name="discount"
            label="Desconto"
            value={discount}
            onChange={handleChangeDiscount}
            fullWidth
            decimalScale={discountType === 'money' ? 2 : 0}
            decimalSeparator={','}
            allowNegative={false}
            isAllowed={({ floatValue }) => {
              const maxValue = discountType === 'money' ? Number(amount.replace(',', '.')) : 100
              if (discountType === 'money' && !amount) {
                toast.warning(`Defina um valor antes de inserir o desconto.`)
                return false
              }
              const isValid = (floatValue ? floatValue : 0) <= maxValue
              const maxValueFormatted = discountType === 'money' ? `R$ ${amount}` : `${100}%`
              if (!isValid) toast.warning(`O valor máximo permitido é de ${maxValueFormatted}.`)
              if (isValid) return true
              return false
            }}
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
