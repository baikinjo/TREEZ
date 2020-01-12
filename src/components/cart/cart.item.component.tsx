import React, { useContext } from 'react'
import { Item, Label, Icon } from 'semantic-ui-react'
import { CartContext } from '../../providers/cart.provider'
import { CART_ITEM_TYPE } from '../../utils/types'

const CartItemList = () => {
  const { cartItems, removeItem } = useContext(CartContext)

  return (
    <>
      <Item.Group divided>
        {cartItems &&
          cartItems.map((item: CART_ITEM_TYPE, index: number) => (
            <Item key={index}>
              <Item.Content>
                <Item.Header
                  style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    display: 'block',
                    marginBottom: 24
                  }}
                >
                  {item.name}
                </Item.Header>
                <Item.Meta
                  style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center'
                  }}
                >
                  Qty: <Label>{item.quantity}</Label> |{' '}
                  <Label>${Number(item.price) * Number(item.quantity)}</Label> |
                  <Icon
                    onClick={() => removeItem(item)}
                    color='red'
                    name='delete'
                  />
                </Item.Meta>
                <Item.Description></Item.Description>
              </Item.Content>
            </Item>
          ))}
      </Item.Group>
    </>
  )
}

export default CartItemList
