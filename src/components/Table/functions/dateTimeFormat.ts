import { format } from 'date-fns'

const dateTimeFormat = (value?: string | number) => {
  if (!value) return '-'
  return `R$ ${format(new Date(value), 'dd/MM/yyyy HH:mm:ss')}}`
}

export { dateTimeFormat }
