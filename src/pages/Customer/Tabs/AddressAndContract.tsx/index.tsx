import { Box, Button, Grid, Typography, useTheme } from '@mui/material'
import { ContentCard } from '../../../../components/ContentCard'
import { Phones } from './Phones'

export default function AddressAndContact() {
  const { palette } = useTheme()
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} lg={5} xl={4}>
        <ContentCard mb={2}>
          <Phones />
        </ContentCard>
      </Grid>

      <Grid item xs={12} md={6} lg={7} xl={8}>
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
