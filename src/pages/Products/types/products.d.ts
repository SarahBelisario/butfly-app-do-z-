export interface Products {
  id: string
  name: string
  value: number
  quantity: number
  category: string
  createdAt: string | number
}

export interface FormattedProducts {
  id: string
  name: any
  value: number
  quantity: number
  category: any
  createdAt: string | number
}