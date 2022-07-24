import { InputBase, useTheme } from '@mui/material'
import { IoSearch } from 'react-icons/io5'

export function SearchInput({ onChange }: { onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) {
  const { palette } = useTheme()
  return (
    <InputBase
      onChange={onChange}
      fullWidth
      startAdornment={<IoSearch style={{ marginRight: 8 }} />}
      placeholder="Faça sua pesquisa..."
      sx={{ borderRadius: '12px', px: 2, background: palette.background.paper, color: palette.text.primary }}
    />
  )
}
