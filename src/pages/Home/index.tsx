import {
  useTheme,
  Box,
  Chip,
  Grid,
  Typography
} from '@mui/material'
import React from 'react'
import { FaDollarSign } from 'react-icons/fa'
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti'
import { CalendarBar } from '../../components/CalendarBar'
import { ContentCard } from '../../components/ContentCard'
import { LineChart } from '../../components/LineChart'
export function Home(props: any) {
  const { palette } = useTheme()
  return (
    <Box>
      <Typography ml={2} mt={2} variant="h1" fontSize="28px" fontWeight="normal" sx={{ color: palette.text.primary }}>
        Dashboard
      </Typography>
      <Typography ml={2} mt={2} sx={{ fontSize: '16px', color: palette.text.secondary, fontWeight: 'light' }}>
        Aqui você poderá acompanhar os gráficos de sua empresa com atualizações em tempo real 😱
      </Typography>

      <Grid container spacing={2} my={1} sx={{ gridAutoFlow: 'column' }}>
        <Grid item xs={12} md={12}>
          <ContentCard>
            <CalendarBar />
          </ContentCard>
        </Grid>

        {[1, 2, 3].map(() => (
          <Grid item xs={12} md={4}>
            <ContentCard p={4}>
              <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary}>
                Ganhos totais (Jan/2022)
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography fontSize={32} fontWeight="light" color={palette.text.primary}>
                  R$ 1270,00
                </Typography>
                <Chip
                  label="12%"
                  sx={{ background: '#e8434320', color: '#e84343' }}
                  icon={<TiArrowSortedDown color="#e84343" />}
                />
              </Box>
            </ContentCard>
          </Grid>
        ))}
        <Grid item xs={12} md={4} sx={{ display: 'flex', maxHeight: 500 }}>
          <ContentCard p={4} sx={{ width: '100%', overflowY: 'scroll' }}>
            <Typography fontWeight="light" fontSize="14px" color="lightgray">
              Eventos recentes
            </Typography>
            {[1, 1, 3, 12, 32, 49, 75].map(a => (
              <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                <FaDollarSign style={{ fontSize: 24, color: palette.secondary.main }} />
                <Box>
                  <Typography sx={{ ml: 2, fontSize: 16, fontWeight: 'normal', color: palette.text.primary }}>
                    Nova venda registrada
                  </Typography>

                  <Typography sx={{ ml: 2, fontSize: 12, fontWeight: 'light', color: palette.text.secondary }}>
                    {a} minutos atrás
                  </Typography>
                </Box>
              </Box>
            ))}
          </ContentCard>
        </Grid>
        <Grid item xs={12} md={8} sx={{ display: 'flex', }}>
          <ContentCard p={4} sx={{ width: '100%', maxWidth: '100%' }} >
            <LineChart />
          </ContentCard>
        </Grid>
      </Grid>
    </Box>
  )
}
