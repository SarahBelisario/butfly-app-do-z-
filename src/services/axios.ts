import axios from 'axios'

const token = localStorage.getItem('token')

const ApiInstance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 10000,
  headers: {
    authorization: `Bearer ${token}`
  }
})

export { ApiInstance }
