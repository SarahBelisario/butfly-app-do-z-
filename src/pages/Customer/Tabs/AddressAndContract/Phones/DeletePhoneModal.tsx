import { LoadingButton } from '@mui/lab'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { CustomerContext } from '@pages/Customer/CustomerContext'
import { ApiInstance } from '@services/axios'
import { phoneMask } from '@utils/phoneMask'
import { useContext, useState } from 'react'
import { toast } from 'react-toastify'

export function DeletePhoneModal({
  open,
  onClose,
  customerName,
  customerPhone,
  phoneUid
}: {
  open: boolean
  onClose: VoidFunction
  customerName: string
  customerPhone: string
  phoneUid: string
}) {
  const { customer, setCustomer } = useContext(CustomerContext)
  const [isLoading, setIsLoading] = useState(false)
  function handleClose() {
    if (isLoading) return
    onClose()
  }

  async function handleDelete() {
    const companyUid = localStorage.getItem('@Butfly:companyUid')
    setIsLoading(true)

    await ApiInstance.delete(`/companies/${companyUid}/customers/${customer?.uid}/phones/${phoneUid}`, {
      headers: { authorization: 'Bearer ' + localStorage.getItem('@Butfly:token') }
    })
      .then(() => {
        setIsLoading(false)
        handleClose()
        const phones = customer?.phones.filter(value => value.uid !== phoneUid) || []
        setCustomer({ ...customer, phones })
      })
      .catch(error => {
        setIsLoading(false)
        toast(`Erro ao deletar o telefone.`, { type: 'error' })
      })
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Tem certeza?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Você tem certeza que deseja excluir o telefone <b>{phoneMask(customerPhone)}</b>?
        </DialogContentText>
        <DialogContentText>
          Esta ação irá remove-lo permanentemente da lista de contatos do cliente <b>{customerName}</b>, e não será possível recuperá-lo.
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
