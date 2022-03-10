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
    setTheme
  }

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={value.muiTheme}>
        <ToastContainer limit={3} theme={'colored'} />
        <SpeedDial
          ariaLabel="theme-selector"
          style={{ position: 'absolute', right: 16, bottom: 16 }}
          FabProps={{ color: 'secondary' }}
          icon={<IoIosColorPalette fontSize="22px" />}
        >
          {Object.keys(availableThemes).map((theme) => (
            <SpeedDialAction
              key={theme}
              onClick={() => {
                localStorage.setItem('theme', theme)
                setTheme(theme as AvailableThemes)
              }}
              FabProps={{
                style: {
                  color: 'white',
                  background: availableThemes[theme].muiTheme.palette.primary.main
                }
              }}
              icon={<IoIosColorPalette />}
              tooltipTitle={availableThemes[theme].themePalette.title}
            />
          ))}
        </SpeedDial>
        <Routes />
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
