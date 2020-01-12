import React, { useContext } from 'react'
import { Segment, Header, Divider, Button } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

import { CartContext } from '../../providers/cart.provider'
import CartItemList from './cart.item.component'

const Cart = () => {
  const { subtotal, cartItems } = useContext(CartContext)
  const history = useHistory()
  const onClick = () => {
    history.push('/checkout')
  }
  return (
    <Segment
      padded='very'
      style={{
        color: 'black',
        width: 400
      }}
    >
      <Header as='h5' textAlign='center'>
        Summary
      </Header>
      <Divider clearing />
      {!cartItems.length ? (
        <Header as='h2' textAlign='center'>
          Cart is Empty!
        </Header>
      ) : (
        <CartItemList />
      )}

      <Divider clearing />
      <Header floated='right' as='h5'>
        Subtotal: ${subtotal}
      </Header>
      <Button
        color='black'
        disabled={!cartItems.length}
        onClick={onClick}
        fluid
      >
        Check out
      </Button>
    </Segment>
  )
}

export default Cart
