import { Box } from '@mui/material'
import { useTheme } from '@mui/system'
import { SyntheticEvent, useState } from 'react'
import { AsyncAutoComplete } from '../../../components/AsyncAutoComplete'
import { ApiInstance } from '../../../services/axios'

export function Customer() {
  const { palette } = useTheme()
  const [customers, setCustomers] = useState([])
  const [customerLoading, setCustomerLoading] = useState(false)
  const [value, setValue] = useState({ name: '' })

  async function fetchCustomers(event: SyntheticEvent<Element, Event>, value: string) {
    setCustomerLoading(true)
    await ApiInstance.get(`customers`, { params: { name: value } })
      .then(response => {
        setCustomers(response.data.rows)
        setCustomerLoading(false)
      })
      .catch(() => {
        setCustomerLoading(false)
      })
  }

  return (
    <Box p={1}>
      <AsyncAutoComplete
        isRequired
        label="Cliente"
        name="client"
        data={customers}
        setData={setCustomers}
        value={value}
        onChange={setValue}
        fetchData={fetchCustomers}
      />
    </Box>
  )
}
