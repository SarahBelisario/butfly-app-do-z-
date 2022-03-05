import { Theme } from '@mui/material'
import { dark } from './Dark'
import { light } from './Light'

const availableThemes: { [field: string]: Theme } = { light, dark }

export { availableThemes, light, dark }
