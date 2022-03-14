import { createTheme } from '@mui/material/styles'
import { buttons } from './overrides/button'
import { inputs } from './overrides/input'
import { list } from './overrides/list'
import { table } from './overrides/table'
import { dialog } from './overrides/dialog'
import { autocomplete } from './overrides/autocomplete'
import { GenericPaletteProps } from './types/Theme'

const muiTheme = createTheme({
  palette: {
    primary: { main: '#cb7dff' },
    secondary: { main: '#ff7dd6' },
    success: { main: '#00e8b2' },
    error: { main: '#ff3650' },
    warning: { main: '#ebb134' },
    info: { main: '#36c9ff' },
    mode: 'light',
    background: { default: '#f5f9ff', paper: '#ffffff' },
    text: { primary: 'rgba(0,0,0,.9)', secondary: 'rgba(0,0,0,.5)' },
  },
  typography: {
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
  },
  components: {
    ...inputs,
    ...autocomplete,
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10,
          height: 42,
        },
        contained: {
          color: 'white',
        },
      },
    },
    MuiFab: {
      styleOverrides: {
        root: {
          color: 'white',
        },
      },
    },
    ...list,
    ...table,
    ...dialog,
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255, .15)',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(12px)',
        },
      },
    },
  },
})

const themePalette: GenericPaletteProps = {
  title: 'Unicórnio',
  navbar: {
    background: 'url(https://mir-s3-cdn-cf.behance.net/project_modules/fs/6ab7a786128681.5d909dad4b086.jpg)',
    backgroundRepeat: 'no-repeat',
  },
  body: { background: 'rgba(255, 255, 255, 0.65)', backdropFilter: 'blur(5px)' },
  card: { background: 'rgba(255, 255, 255, 0.35)' },
}

export default { muiTheme, themePalette }
