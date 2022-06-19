import { Box, Grid, Tab, Tabs, Typography, useTheme } from '@mui/material'
import { ContentCard } from '../../components/ContentCard'
import { useParams } from 'react-router-dom'
import { PageContainer } from '../../components/PageContainer'
import { useEffect, useState } from 'react'
import { ApiInstance } from '../../services/axios'
import AddressAndContact from './Tabs/AddressAndContract.tsx'

export default function Customer() {
  const { uid } = useParams()
  const [tab, setTab] = useState(0)
  const [customer, setCustomer] = useState<any>()
  const { palette } = useTheme()
  const companyUid = localStorage.getItem('@Butfly:companyUid')
  useEffect(() => {
    async function fetchData() {
      const customer = await ApiInstance.get(`/companies/${companyUid}/customers/${uid}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('@Butfly:token')}` }
      })
      setCustomer(customer.data)
    }
    fetchData()
  }, [uid])
  return (
    <PageContainer mainText={customer?.name} secondaryText={customer?.surname || ''}>
      <Box mt={3} mb={2}>
        <Tabs
          value={tab}
          TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
          sx={{
            '& .MuiTabs-indicator': { display: 'flex', justifyContent: 'center', backgroundColor: 'transparent' },
            '& .MuiTabs-indicatorSpan': { maxWidth: '80%', width: '100%', background: palette.primary.main }
          }}
          onChange={(e, value) => setTab(value)}
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable force tabs example"
        >
          <Tab style={{ borderRadius: 12 }} label="Resumo" />
          <Tab style={{ borderRadius: 12, overflow: 'hidden' }} label="Compras" />
          <Tab style={{ borderRadius: 12 }} label="Serviços" />
          <Tab style={{ borderRadius: 12 }} label="Endereço & contato" />
        </Tabs>

        <Box mt={3}>{tab === 3 && <AddressAndContact customer={customer} />}</Box>
      </Box>
    </PageContainer>
  )
}
