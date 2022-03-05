/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext } from 'react'

const ThemeContext = createContext({
  theme: 'light',
  setTheme: (theme: string) => {}
})
export { ThemeContext }
