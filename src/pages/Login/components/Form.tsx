import { LoadingButton } from '@mui/lab'
import { Alert, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import { AuthContext } from '../../../contexts/AuthProvider'
import { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { useLocation, useNavigate } from 'react-router-dom'
import { ApiInstance } from '../../../services/axios'

export default function Form(props: any) {
  const errorMessages = {
    'User not found.': 'Usuário não encontrado, verifique seu email',
    'Invalid password.': 'Sua senha está incorreta',
    'Internal server error': 'Erro interno no servidor'
  }
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [notification, setNotification] = useState<{ display: boolean; status: 'success' | 'error' | 'warning'; message: string }>({
    display: false,
    status: 'success',
    message: ''
  })
  const { palette } = useTheme()
  const { signIn } = useContext(AuthContext)
  const location: { state: { from?: { pathname: string } } } = useLocation() as any
  const from = location?.state?.from?.pathname || '/'
  console.log('From: ', from)

  const submit = async (data: any) => {
    setIsLoading(true)
    try {
      const response = await ApiInstance.post('/signin', { email: data.email, password: data.password })
      const userRequest = await ApiInstance.get('/me', {
        headers: { authorization: `Bearer ${response.data.token}` }
      })

      signIn(userRequest.data.user, userRequest.data.companies, () => {
        localStorage.setItem('@Butfly:token', response.data.token)
        navigate(from)
      })
    } catch (error: any) {
      const errorMessage = errorMessages[error?.response?.data.message]
      setIsLoading(false)
      setNotification({ display: true, message: errorMessage, status: 'error' })
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} {...props}>
      <TextField id="email" disabled={isLoading} type="email" label="Email" fullWidth required sx={{ mt: 2 }} {...register('email')} />

      <TextField
        id="password"
        disabled={isLoading}
        type={showPassword ? 'text' : 'password'}
        label="Senha"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton tabIndex={-1} size="small" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
              </IconButton>
            </InputAdornment>
          )
        }}
        required
        fullWidth
        sx={{ mt: 2 }}
        {...register('password')}
      />

      {notification.display && (
        <Alert severity={notification.status} sx={{ mt: 2 }}>
          {notification.message}
        </Alert>
      )}

      <LoadingButton fullWidth color="primary" variant="contained" type="submit" sx={{ mt: 2, position: 'relative' }} loading={isLoading}>
        Login
      </LoadingButton>

      <Typography
        color={palette.text.primary}
        fontWeight="light"
        sx={{
          mt: 2,
          fontSize: 13,
          fontWeight: 'normal',
          textAlign: 'center'
        }}
      >
        É novo por aqui?
        <Typography
          onClick={() => navigate('/registro')}
          component="span"
          color="primary"
          fontWeight="bold"
          sx={{
            ml: 0.5,
            fontSize: 13,
            fontWeight: 'bold',
            textAlign: 'center',
            cursor: 'pointer'
          }}
        >
          Registre-se
        </Typography>
      </Typography>
    </form>
  )
}
