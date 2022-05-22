import { Avatar, IconButton, Typography, useMediaQuery } from '@mui/material'
import { Box } from '@mui/system'
import { AuthContext } from '../../../contexts/AuthProvider'
import { useContext, useEffect } from 'react'
import { IoLogOut } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { ApiInstance } from '../../../services/axios'

export function User() {
  const isMobile = useMediaQuery('(max-width:600px)')
  const navigate = useNavigate()
  const { user, companies, signIn, signOut } = useContext(AuthContext)

  const selectedCompany = companies.find(company => company.uid === localStorage.getItem('@Butfly:companyUid'))

  useEffect(() => {
    async function fetchData() {
      if (!user.name) {
        await ApiInstance.get('/me')
          .then(({ data }) => signIn(data.user, data.companies, () => null))
          .catch(error => navigate('/login'))
      }
    }
    fetchData()
  }, [])
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar>{user?.name[0]}</Avatar>
      <Box sx={{ display: isMobile ? 'none' : 'initial' }}>
        <Typography sx={{ color: 'white', ml: 2, fontWeight: 'bold', fontSize: 13 }}>{user?.name}</Typography>
        <Typography sx={{ color: 'white', ml: 2, fontWeight: 'normal', fontSize: 11 }}>{selectedCompany?.name}</Typography>
      </Box>
      <IconButton sx={{ ml: 'auto', display: isMobile ? 'none' : 'initial' }} onClick={() => signOut(() => navigate('/login'))}>
        <IoLogOut color="white"></IoLogOut>
      </IconButton>
    </Box>
  )
}
