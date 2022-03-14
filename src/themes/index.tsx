import { Theme } from '@mui/material'
import dark from './Dark'
import light from './Light'
import { GenericPaletteProps } from './types/Theme'
import unicorn from './Unicorn'

const availableThemes: {
  [field: string]: { muiTheme: Theme; themePalette: GenericPaletteProps }
} = {
  light,
  dark,
  unicorn,
}

export { availableThemes }
