import { Box } from '@mui/material'
import { PageContainer } from 'components/PageContainer'
import { ThemeList } from './ThemeList'

export function ThemeSelection() {
  return (
    <Box>
      <PageContainer mainText="Personalização" secondaryText="Explore temas incríveis, crie seus próprios temas e deixe o sistema com sua cara.">
        <ThemeList />
      </PageContainer>
    </Box>
  )
}
