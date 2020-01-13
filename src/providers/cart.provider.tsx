import React, { createContext, useState, useEffect } from 'react'
import { CART_ITEM_TYPE, INVENTORY_TYPE } from '../utils/types'
import { firestore } from '../utils/firebase.utils'

interface CartContextInterface {
  cartItems: CART_ITEM_TYPE[]
  addItem: (item: CART_ITEM_TYPE) => void
  removeItem: (item: CART_ITEM_TYPE) => void
  decrementItem: (item: CART_ITEM_TYPE) => void
  clearCart: () => void
  itemsCount: number
  cartOpen: boolean
  openCart: () => void
  closeCart: () => void
  subtotal: number
  inventory: INVENTORY_TYPE
  setInventory: (list: any) => void
  updateInventory: (list: CART_ITEM_TYPE[], type: string | undefined) => void
}

export const CartContext = createContext<CartContextInterface>({
  cartItems: [],
  addItem: (item: CART_ITEM_TYPE) => {},
  removeItem: (item: CART_ITEM_TYPE) => {},
  decrementItem: (item: CART_ITEM_TYPE) => {},
  clearCart: () => {},
  itemsCount: 0,
  cartOpen: false,
  openCart: () => {},
  closeCart: () => {},
  subtotal: 0,
  inventory: [],
  setInventory: (list: any) => {},
  updateInventory: (list: CART_ITEM_TYPE[], type: string | undefined) => {}
})

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, $cartItems] = useState<CART_ITEM_TYPE[]>([])
  const [itemsCount, $itemsCount] = useState(0)
  const [subtotal, $subtotal] = useState(0)
  const [cartOpen, $cartOpen] = useState(false)
  const [inventory, $inventory] = useState<INVENTORY_TYPE>([])

  const openCart = () => $cartOpen(true)
  const closeCart = () => $cartOpen(false)

  const setInventory = (list: any) => $inventory(list)

  const addItem = (item: CART_ITEM_TYPE) => {
    let updatedCart: any
    var exist = cartItems.find(c => c.id === item.id)
    var limit = Number(inventory[0].items.find(i => i.id === item.id)?.quantity)
    if (exist) {
      if (Number(exist.quantity) < limit) {
        exist.quantity = Number(exist.quantity) + 1
        updatedCart = [...cartItems]
        return $cartItems(updatedCart)
      } else {
        updatedCart = [...cartItems]
        return $cartItems(updatedCart)
      }
    } else {
      updatedCart = [...cartItems, item]
      return $cartItems(updatedCart)
    }
  }

  const decrementItem = (item: CART_ITEM_TYPE) => {
    let updatedCart: any
    var exist = cartItems.find(c => c.id === item.id)

    if (exist && Number(exist?.quantity) === 1) {
      updatedCart = cartItems.filter(c => c.id !== item.id)
      return $cartItems(updatedCart)
    } else if (exist) {
      exist.quantity = Number(exist.quantity) - 1
      updatedCart = [...cartItems]
      return $cartItems(updatedCart)
    }
  }

  const removeItem = (item: CART_ITEM_TYPE) => {
    let updatedCart: any
    var exist = cartItems.find(c => c.id === item.id)
    if (exist) {
      updatedCart = cartItems.filter(c => c.id !== item.id)
      return $cartItems(updatedCart)
    }
  }

  const clearCart = () => {
    return $cartItems([])
  }

  const updateInventory = async (
    list: CART_ITEM_TYPE[],
    type: string | undefined
  ) => {
    let newInventory = inventory[0].items

    newInventory.forEach(item => {
      var matched = list.filter((l: CART_ITEM_TYPE) => l.id === item.id)[0]
      if (matched) {
        if (type === 'submit') {
          item.quantity = Number(item.quantity) - Number(matched.quantity)
        } else {
          item.quantity = Number(item.quantity) + Number(matched.quantity)
        }
      }
    })

    const inventoryRef = firestore
      .collection('inventory')
      .doc('SHu2n7mZt8DZGEc57SIG')
    await inventoryRef.update({
      items: newInventory
    })
  }

  let total = 0
  let amount = 0

  useEffect(() => {
    const totalCount = () => {
      cartItems.map(c => {
        total += Number(c.quantity)
        amount += Number(c.price) * Number(c.quantity)
      })
    }
    totalCount()
    $itemsCount(total)
    $subtotal(amount)
  }, [cartItems])

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        removeItem,
        decrementItem,
        clearCart,
        itemsCount,
        cartOpen,
        openCart,
        closeCart,
        subtotal,
        inventory,
        setInventory,
        updateInventory
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
