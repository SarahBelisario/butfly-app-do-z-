import { validatePhone } from 'validations-br'
import * as yup from 'yup'

export const phoneSchema = yup
  .object()
  .shape({
    phone: yup
      .string()
      .test('phone', 'O telefone precisa ser válido.', function (item?: string) {
        if (!item) return false
        return validatePhone(item)
      })
      .required('É necessário informar o estado.')
  })
  .required()
