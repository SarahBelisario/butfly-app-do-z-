import createTheme from '@mui/material/styles/createTheme'
import { buttons } from './overrides/button'
import { inputs } from './overrides/input'
import { list } from './overrides/list'
import { table } from './overrides/table'
import { dialog } from './overrides/dialog'
import { autocomplete } from './overrides/autocomplete'

const light = createTheme({
  palette: {
    primary: { main: '#6200ff' },
    secondary: { main: '#f62681' },
    success: { main: '#0eccc9' },
    background: { default: '#f5f9ff', paper: '#ffffff' },
    text: { primary: '#000', secondary: '#999' }
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`
  },
  components: {
    ...inputs,
    ...autocomplete,
    ...buttons,
    ...list,
    ...table,
    ...dialog,
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255, .15)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(12px)'
        }
      }
    }
  }
})

export { light }
