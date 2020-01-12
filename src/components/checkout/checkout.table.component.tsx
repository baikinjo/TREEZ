import React, { useContext } from 'react'
import { Table, Icon } from 'semantic-ui-react'

import { CartContext } from '../../providers/cart.provider'
import { USER_TYPE } from '../../utils/types'

const CheckOutTable = ({ currentUser }: { currentUser: USER_TYPE }) => {
  const { removeItem, cartItems, addItem, decrementItem } = useContext(
    CartContext
  )

  return (
    <>
      <Table textAlign='center' color='black'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Item</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Remove</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {cartItems &&
          cartItems.map((item, index: number) => {
            const total = Number(item.price) * Number(item.quantity)
            return (
              <Table.Body key={index}>
                <Table.Row>
                  <Table.Cell>{item.name}</Table.Cell>
                  <Table.Cell>
                    <Icon
                      onClick={() => decrementItem(item)}
                      name='angle left'
                    />
                    {item.quantity}
                    <Icon onClick={() => addItem(item)} name='angle right' />
                  </Table.Cell>
                  <Table.Cell>${total}</Table.Cell>
                  <Table.Cell>
                    <Icon
                      onClick={() => removeItem(item)}
                      name='delete'
                      color='red'
                    />
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            )
          })}
      </Table>
    </>
  )
}

export default CheckOutTable
