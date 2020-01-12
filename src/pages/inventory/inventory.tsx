import React, { useEffect, useContext } from 'react'

import InventoryCard from '../../components/inventory/inventory.card'
import { firestore, convertSnapshotToMap } from '../../utils/firebase.utils'
import { CartContext } from '../../providers/cart.provider'

const InventoryPage = () => {
  const { inventory, setInventory } = useContext(CartContext)

  useEffect(() => {
    let unsubscribeFromSnapshot: any = null
    const collectionRef = firestore.collection('inventory')
    unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      const list = convertSnapshotToMap(snapshot)
      setInventory(list)
    })

    return () => {
      unsubscribeFromSnapshot()
    }
  }, [setInventory])

  return (
    <>
      <InventoryCard inventory={inventory[0]} />
    </>
  )
}

export default InventoryPage
