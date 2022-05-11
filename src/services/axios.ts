import axios from 'axios'

const ApiInstance = axios.create({
  baseURL: 'http://localhost:4000',
  timeout: 10000,
  headers: {
    authorization: `Bearer ${localStorage.getItem('token')}`
  }
})

export { ApiInstance }
