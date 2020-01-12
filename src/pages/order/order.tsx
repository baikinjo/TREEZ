import React, { useEffect, useState } from 'react'
import { USER_TYPE } from '../../utils/types'
import { Header } from 'semantic-ui-react'
import { firestore } from '../../utils/firebase.utils'
import OrderStatusTable from '../../components/order/order.table.component'

const OrderPage = ({ currentUser }: { currentUser: USER_TYPE }) => {
  const [orders, $orders] = useState<any>([])
  useEffect(() => {
    let unsubscribeFromSnapshot: any = null
    const userRef = firestore.collection('users').doc(currentUser.id)
    unsubscribeFromSnapshot = userRef.onSnapshot(async snapshot => {
      $orders(snapshot.data()?.orders)
    })

    return () => {
      unsubscribeFromSnapshot()
    }
  }, [currentUser.id])

  console.log(orders)

  return (
    <div style={{ width: '80%' }}>
      <div style={{ minHeight: 500 }}>
        <Header as='h2'>Order Status</Header>
        {!orders.length ? (
          <Header as='h4'>You don't have any orders!</Header>
        ) : (
          <OrderStatusTable orders={orders} currentUser={currentUser} />
        )}
      </div>
    </div>
  )
}

export default OrderPage
