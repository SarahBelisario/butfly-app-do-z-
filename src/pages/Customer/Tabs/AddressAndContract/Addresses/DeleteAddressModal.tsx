import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Modal } from '@mui/material'
import { CustomerContext } from '@pages/Customer/CustomerContext'
import { ApiInstance } from '@services/axios'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'

export function DeleteAddressModal({ isOpen, onClose, addressUid }: { isOpen: boolean; onClose: VoidFunction; addressUid: string }) {
  const [isLoading, setIsLoading] = useState(false)
  const { customer, setCustomer } = useContext(CustomerContext)

  async function handleDelete() {
    const companyUid = localStorage.getItem('@Butfly:companyUid')
    setIsLoading(true)

    await ApiInstance.delete(`/companies/${companyUid}/customers/${customer?.uid}/addresses/${addressUid}`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('@Butfly:token') }
    })
      .then(() => {
        setIsLoading(false)
        onClose()
        const addresses = customer?.addresses.filter(value => value.uid !== addressUid) || []
        setCustomer({ ...customer, addresses })
      })
      .catch(error => {
        setIsLoading(false)
        toast(`Erro ao deletar o endereço.`, { type: 'error' })
      })
  }

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Tem certeza?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Você tem certeza que deseja excluir este endereço? Esta ação irá remove-lo permanentemente da lista de endereços do cliente{' '}
          <b>{customer?.name}</b>, e não será possível recuperá-lo.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button disabled={isLoading} variant="outlined" color="primary" onClick={onClose}>
          Não, cancelar
        </Button>

        <LoadingButton loading={isLoading} onClick={handleDelete} variant="contained" color="error">
          Sim, deletar
        </LoadingButton>
      </DialogActions>
    </Dialog>
  )
}
