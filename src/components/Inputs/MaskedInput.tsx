import { TextField } from '@mui/material'
import ReactInputMask from 'react-input-mask'

export const MaskedInput = (props: any) => <ReactInputMask {...props}>{(inputProps: any) => <TextField {...inputProps} />}</ReactInputMask>
