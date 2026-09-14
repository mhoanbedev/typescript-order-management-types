export interface Product {
  id: number
  name: string
  price: number
  image: string
  description: string
}

export interface ProductsState {
  items: Product[]
  loading: boolean
  error: string | null
}
