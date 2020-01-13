import React, { useState, useEffect, useContext } from 'react'

import { GlobalStyle } from './styles/global.styles'
import MyRouter from './router'

import {
  auth,
  createUserProfileDocument,
  firestore,
  convertSnapshotToMap
} from './utils/firebase.utils'
import { CartContext } from './providers/cart.provider'

const App = () => {
  const [currentUser, $currentUser] = useState<any>(null)
  const { setInventory } = useContext(CartContext)

  useEffect(() => {
    let unsubscribeFromAuth: any = null
    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth)
        userRef?.onSnapshot(snapShot => {
          $currentUser({
            id: snapShot.id,
            ...snapShot.data()
          })
        })
      } else {
        $currentUser(userAuth)
      }
    })
    return () => {
      unsubscribeFromAuth()
    }
  }, [])

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
      <GlobalStyle />
      <MyRouter currentUser={currentUser} />
    </>
  )
}

export default App
