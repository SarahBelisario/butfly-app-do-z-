import React, { useState } from 'react'
import { ThemeProvider } from '@mui/material/styles'

import { Routes } from './routes'
import { ThemeContext } from './themes/ThemeContext'
import { availableThemes, light, dark } from './themes'
import { SpeedDial, SpeedDialAction } from '@mui/material'
import { IoIosColorPalette } from 'react-icons/io'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function App() {
  const userTheme = localStorage.getItem('theme')
  const [theme, setTheme] = useState(userTheme || 'light')
  const value: { theme: string; setTheme: (theme: string) => void } = { theme, setTheme }

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={availableThemes[theme]}>
        <ToastContainer limit={3} theme={'colored'} />
        <SpeedDial
          ariaLabel="theme-selector"
          style={{ position: 'absolute', right: 16, bottom: 16 }}
          FabProps={{ color: 'secondary' }}
          icon={<IoIosColorPalette />}
        >
          <SpeedDialAction
            key={'Light'}
            onClick={() => {
              localStorage.setItem('theme', 'light')
              setTheme('light')
            }}
            FabProps={{
              style: {
                color: 'white',
                background: `linear-gradient(135deg, ${light.palette.primary.main} 50%, ${light.palette.secondary.main} 50%)`
              }
            }}
            icon={<IoIosColorPalette />}
            tooltipTitle={'Light'}
          />
          <SpeedDialAction
            key={'Dark'}
            onClick={() => {
              localStorage.setItem('theme', 'dark')
              setTheme('dark')
            }}
            FabProps={{
              style: {
                color: 'white',
                background: `linear-gradient(135deg, ${dark.palette.primary.main} 50%, ${dark.palette.secondary.main} 50%)`
              }
            }}
            icon={<IoIosColorPalette />}
            tooltipTitle={'Dark'}
          />
        </SpeedDial>
        <Routes />
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}
