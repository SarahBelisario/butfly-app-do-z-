import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'

interface ProductProps {
  name: string
}
interface RemoveProductProps {
  open: boolean
  handleSetOpen: () => void
  product: ProductProps | null
}
export function RemoveProduct({ open, handleSetOpen, product }: RemoveProductProps) {
  return (
    <Dialog open={open} onClose={handleSetOpen}>
      <DialogTitle>Deseja remover este produto?</DialogTitle>
      <DialogContent>
        <DialogContentText>Você está removendo o produto &quot;{product?.name}&quot;</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSetOpen}>Cancelar</Button>
        <Button autoFocus color="error" variant="contained">
          Remover
        </Button>
      </DialogActions>
    </Dialog>
  )
}
