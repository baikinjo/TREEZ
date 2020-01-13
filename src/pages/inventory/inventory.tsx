import React, { useContext } from 'react'

import InventoryCard from '../../components/inventory/inventory.card'
import { CartContext } from '../../providers/cart.provider'

const InventoryPage = () => {
  const { inventory } = useContext(CartContext)

  return (
    <>
      <InventoryCard inventory={inventory[0]} />
    </>
  )
}

export default InventoryPage
