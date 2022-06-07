import * as yup from 'yup'
import zxcvbn from 'zxcvbn'

export const NewUserSchema = yup.object({
  name: yup
    .string()
    .min(2, 'O nome do cliente precisa ter no mínimo 2 caracteres')
    .required('É necessário informar o nome do cliente')
    .test('MustHaveOnlyValidCharacthers', 'Informe apenas letras e espaços no nome', value => {
      return value?.match(/[^A-zÀ-ú ]/gi) ? false : true
    })
    .test('MustHaveLastName', 'Informe o nome com sobrenome', value => {
      if (!value) return false
      return value?.split(' ').length < 2 ? false : true
    }),
  email: yup.string().email('O email precisa ser válido'),
  password: yup
    .string()
    .min(8, 'A senha deve conter no mínimo 8 dígitos')
    .max(80, 'A senha deve conter no máximo 80 dígitos')
    .test('MustBeStrong', 'A senha deve ser forte', value => zxcvbn(value as string).score > 2),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Senha e confirmação devem ser iguais.')
})
