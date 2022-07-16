import { Grid } from '@mui/material'
import { ContentCard } from '../../../../components/ContentCard'
import { Addresses } from './Addresses'
import { Phones } from './Phones'

export default function AddressAndContact() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={5} xl={4}>
        <ContentCard mb={2}>
          <Phones />
        </ContentCard>
      </Grid>

      <Grid item xs={12} md={6} lg={7} xl={8}>
        <ContentCard>
          <Addresses />
        </ContentCard>
      </Grid>
    </Grid>
  )
}
