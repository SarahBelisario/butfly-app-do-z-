import { Box, Button, Grid, Popover, PopoverProps, TextField, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'

interface FilterPopper extends Omit<PopoverProps, 'open'> {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  anchorEl: HTMLButtonElement | null
  setAnchorEl: (anchorEl: HTMLButtonElement | null) => void
}
export function FilterPopper({ isOpen, setIsOpen, anchorEl, setAnchorEl, ...props }: FilterPopper) {
  const onClose = () => {
    setAnchorEl(null)
    setIsOpen(false)
  }

  const submit = data => {
    console.log(data)
  }

  const { handleSubmit, register } = useForm()

  return (
    <Popover
      id="filter-popover"
      {...props}
      open={isOpen}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(submit)}>
        <Box boxShadow={2}>
          <Grid container spacing={2} p={2} width={400}>
            <Grid item xs={12}>
              <Typography variant="overline">Filtrar produtos</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField label="Produto" fullWidth {...register('product')} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Categoria" fullWidth {...register('category')} />
            </Grid>
          </Grid>

          <Box display="flex" justifyContent="flex-end" px={2} pb={2}>
            <Button sx={{ mx: 1 }}>Resetar</Button>
            <Button variant="contained" type="submit">
              Aplicar
            </Button>
          </Box>
        </Box>
      </form>
    </Popover>
  )
}
