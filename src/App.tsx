import { Theme } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { Slide, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Routes } from './routes'
import { availableThemes } from './themes'
import { ThemeContext } from './themes/ThemeContext'
import { AvailableThemes, GenericPaletteProps } from './themes/types/Theme'

export function App() {
  const userTheme = localStorage.getItem('theme') as AvailableThemes
  const [theme, setTheme] = useState<AvailableThemes>(userTheme || 'light')
  const value: {
    theme: string
    muiTheme: Theme
    genericPalette: GenericPaletteProps
    setTheme: (theme: AvailableThemes) => void
  } = {
    theme,
    genericPalette: availableThemes[theme].themePalette,
    muiTheme: availableThemes[theme].muiTheme,
    setTheme
  }

  const colorMode = availableThemes[theme].muiTheme.palette.mode

  const toastTheme = availableThemes[theme].themePalette.toast
  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={value.muiTheme}>
        <Helmet>
          <meta name="theme-color" content={`${availableThemes[theme].muiTheme.palette.primary.main}`} />
        </Helmet>
        <ToastContainer limit={3} theme={colorMode} transition={Slide} hideProgressBar={false} toastStyle={{ ...toastTheme }} />
        <Routes />
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
