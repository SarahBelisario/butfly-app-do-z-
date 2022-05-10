import { LoadingButton } from '@mui/lab'
import { Alert, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material'
import { motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
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
  const [isLogged, setIsLogged] = useState(false)
  const { palette } = useTheme()
  const [count, setCount] = useState(-1)

  useEffect(() => {
    count > -1 && setTimeout(() => setCount(count - 1), 1000)
    if (count > -1) {
      setNotification({
        display: true,
        message: `Logado com sucesso, redirecionando em ${count}s...`,
        status: 'success'
      })
    }
    isLogged && count === -1 && navigate('/')
  }, [count])

  const submit = async (data: any) => {
    setIsLoading(true)
    await ApiInstance.post('/signin', { email: data.email, password: data.password })
      .then(async response => {
        localStorage.setItem('token', response.data.token)
        setIsLogged(true)
        setCount(3)
      })
      .catch(error => {
        const errorMessage = errorMessages[error.response.data.message]
        setIsLoading(false)
        setNotification({ display: true, message: errorMessage, status: 'error' })
      })
  }

  return (
    <form onSubmit={handleSubmit(submit)} {...props} style={{ width: 400 }}>
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
        {isLogged && count === 0 ? (
          <motion.div
            style={{
              background: palette.primary.main,
              position: 'absolute',
              borderRadius: 5000,
              width: 0,
              height: 0
            }}
            whileInView={{
              width: '300vh',
              height: '300vh',
              zIndex: 1,
              placeItems: 'center'
            }}
            transition={{ ease: [0.86, 0.03, 0.1, 1], duration: 2 }}
          />
        ) : (
          <></>
        )}
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
