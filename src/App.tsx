import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import { Routes } from './routes'
import { ThemeContext } from './themes/ThemeContext'
import { availableThemes } from './themes'
import { SpeedDial, SpeedDialAction, Theme } from '@mui/material'
import { IoIosColorPalette } from 'react-icons/io'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
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
    setTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={value.muiTheme}>
        <ToastContainer limit={3} theme={'colored'} />
        <SpeedDial
          ariaLabel="theme-selector"
          style={{ position: 'absolute', right: 16, bottom: 16 }}
          FabProps={{ color: 'primary' }}
          icon={<IoIosColorPalette fontSize="22px" />}
        >
          {Object.keys(availableThemes).map(theme => {
            const title = availableThemes[theme].themePalette.title
            const primary = availableThemes[theme].themePalette.navbar.background
            const secondary = availableThemes[theme].themePalette.card.background
            return (
              <SpeedDialAction
                key={theme}
                onClick={() => {
                  localStorage.setItem('theme', theme)
                  setTheme(theme as AvailableThemes)
                }}
                FabProps={{ style: { background: `linear-gradient(135deg, ${primary} 49%, ${secondary} 50%)` }, }}
                tooltipTitle={title}
              />
            )
          })}
        </SpeedDial>
        <Routes />
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
