import { Box, Button, Grid, Typography, useTheme } from '@mui/material'
import { ContentCard } from '../../../../components/ContentCard'
import { Phones } from './Phones'

export default function AddressAndContact({
  customer
}: {
  customer: {
    emails: { uid: string; email: string }[]
    phones: { uid: string; phone: string }[]
  }
}) {
  const { palette } = useTheme()
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={5} lg={4}>
        <ContentCard mb={2}>
          <Phones phones={customer.phones} />
        </ContentCard>

        <ContentCard>
          <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary}>
            Emails
          </Typography>

          <Box my={2}>
            {customer.emails.map(value => (
              <Typography fontSize={14}>{value.email}</Typography>
            ))}
            {!customer.emails.length && <Typography fontSize={14}>Não há emails cadastrados para este cliente</Typography>}
          </Box>

          <Box width="100%" display="flex" justifyContent={'flex-end'}>
            <Button size="small" variant="contained">
              Novo email
            </Button>
          </Box>
        </ContentCard>
      </Grid>

      <Grid item xs={12} md={7} lg={8}>
        <ContentCard>
          <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary}>
            Endereços
          </Typography>

          <Grid container rowSpacing={2} my={0.5}>
            <Grid item xs={8}>
              <Typography color="gray" fontSize={14}>
                Cidade
              </Typography>
              <Typography fontSize={14}>Cataguases</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography color="gray" fontSize={14}>
                UF
              </Typography>
              <Typography fontSize={14}>MG</Typography>
            </Grid>

            <Grid item xs={12}>
              <Typography color="gray" fontSize={14}>
                Bairro
              </Typography>
              <Typography fontSize={14}>Imê Farage</Typography>
            </Grid>

            <Grid item xs={8}>
              <Typography color="gray" fontSize={14}>
                Logradouro
              </Typography>
              <Typography fontSize={14}>Rua Amazonas</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography color="gray" fontSize={14}>
                Número
              </Typography>

              <Typography fontSize={14}>115</Typography>
            </Grid>

            <Grid item xs={4}>
              <Typography color="gray" fontSize={14}>
                Complemento
              </Typography>
              <Typography fontSize={14}>Última casa</Typography>
            </Grid>
          </Grid>

          <Box width="100%" display="flex" justifyContent={'flex-end'}>
            <Button size="small" variant="contained">
              Novo endereço
            </Button>
          </Box>
        </ContentCard>
      </Grid>
    </Grid>
  )
}
