import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import CheckOutTable from '../../components/checkout/checkout.table.component'
import { CartContext } from '../../providers/cart.provider'
import { Header, Button, Confirm } from 'semantic-ui-react'
import { USER_TYPE } from '../../utils/types'
import { firestore, auth } from '../../utils/firebase.utils'
import firebase from 'firebase/app'

const CheckoutPage = ({ currentUser }: { currentUser: USER_TYPE }) => {
  const history = useHistory()
  const { subtotal, cartItems, clearCart, updateInventory } = useContext(
    CartContext
  )
  const [confirm, $confirm] = useState(false)

  const submitOrder = async () => {
    const order = {
      cartItems,
      subtotal,
      createdAt: Date.now()
    }
    const userRef = firestore.collection('users').doc(currentUser.id)
    await userRef.update({
      orders: firebase.firestore.FieldValue.arrayUnion(order)
    })
    clearCart()
    $confirm(true)
  }

  return (
    <div style={{ width: '80%' }}>
      <div style={{ minHeight: 500 }}>
        <Header as='h2'>Your Orders</Header>
        {!cartItems.length ? (
          <Header as='h4'>You don't have any orders!</Header>
        ) : (
          <CheckOutTable currentUser={currentUser} />
        )}
      </div>
      <div>
        <Header as='h3' textAlign='right'>
          Subtotal: ${subtotal}
        </Header>
        <Button
          disabled={!cartItems.length}
          onClick={submitOrder}
          color='teal'
          floated='right'
        >
          Submit
        </Button>
        <Button color='red' onClick={() => history.push('/')} floated='right'>
          Go Back
        </Button>
      </div>
      <Confirm
        open={confirm}
        cancelButton='log out'
        confirmButton='main page'
        content='Order Successful!'
        size='small'
        onCancel={() => auth.signOut()}
        onConfirm={() => history.push('/')}
      />
    </div>
  )
}

export default CheckoutPage
