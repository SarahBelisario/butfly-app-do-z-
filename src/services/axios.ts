import { getApiUrl } from '@utils/getBaseUrl'
import axios from 'axios'

console.log(getApiUrl())
const ApiInstance = axios.create({
  baseURL: getApiUrl(),
  timeout: 10000
})

export { ApiInstance }
