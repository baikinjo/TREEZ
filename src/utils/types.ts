export type INVENTORY_TYPE = {
  routeName: string
  id: string
  title: string
  items: {
    id: number
    description: string
    name: string
    price: string
    quantity: string
  }[]
}[]

export type ITEM_TYPE = {
  routeName: string
  id: string
  title: string
  items: {
    id: number
    description: string
    name: string
    price: string
    quantity: string
  }[]
}

export interface CART_ITEM_TYPE {
  id: number
  name: string
  price: string | number
  quantity: string | number
}

export type USER_TYPE = {
  id?: string
  displayName?: string
  email?: string
  createdAt?: Date
  orders?: {
    productId: number
    product: string
    price: number
    quantity: number
    orderAt: Date
  }[]
}
