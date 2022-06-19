import { Box, Button, Fab, IconButton, TextField, Typography, useTheme } from '@mui/material'
import { MdCheck, MdClose } from 'react-icons/md'

export function Phones({ phones }: { phones: { uid: string; phone: string }[] }) {
  const { palette } = useTheme()
  return (
    <Box>
      <Typography fontWeight="light" fontSize="14px" color={palette.text.secondary}>
        Telefones
      </Typography>

      <Box my={2}>
        {phones.map(value => (
          <Typography fontSize={14}>{value.phone}</Typography>
        ))}
        <Box display="flex">
          <TextField label="Telefone" fullWidth sx={{ mr: 1 }}></TextField>
          <IconButton color="error">
            <MdClose size={30} />
          </IconButton>
          <IconButton color="success">
            <MdCheck size={30} />
          </IconButton>
        </Box>
      </Box>
      <Box width="100%" display="flex" justifyContent={'flex-end'}>
        <Button size="small" variant="contained" sx={{ ml: 'auto' }}>
          Novo telefone
        </Button>
      </Box>
    </Box>
  )
}
