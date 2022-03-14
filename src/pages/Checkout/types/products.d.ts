export interface ProductProps {
  uid: string
  name: string
  quantity: string
  price: number
  category: {
    name: string
  }
}

export interface ProductListProps {
  product: ProductProps
  amount: number
  quantity: number
}
