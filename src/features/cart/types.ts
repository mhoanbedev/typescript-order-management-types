export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export interface CartState {
  items: CartItem[]
  total: number
}
