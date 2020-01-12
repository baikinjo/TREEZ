import React from 'react'
import { Table, Modal, Icon } from 'semantic-ui-react'
import { convertTimestamp } from '../../utils/time.conversion'
import { USER_TYPE } from '../../utils/types'
import { firestore } from '../../utils/firebase.utils'

const OrderStatusTable = ({
  orders,
  currentUser
}: {
  orders: any
  currentUser: USER_TYPE
}) => {
  const deleteOrder = async (item: any) => {
    const userRef = firestore.collection('users').doc(currentUser.id)
    await userRef.update({
      orders: orders.filter((order: any) => order.createdAt !== item.createdAt)
    })
  }

  return (
    <>
      <Table textAlign='center' color='black'>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Id</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Amount</Table.HeaderCell>
            <Table.HeaderCell>Details</Table.HeaderCell>
            <Table.HeaderCell>Remove</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {orders &&
          orders.map((item: any, index: number) => {
            const time = convertTimestamp(item.createdAt)
            return (
              <Table.Body key={index}>
                <Table.Row>
                  <Table.Cell>{index}</Table.Cell>
                  <Table.Cell>{time}</Table.Cell>
                  <Table.Cell>${item.subtotal}</Table.Cell>
                  <Table.Cell>
                    <Modal
                      trigger={
                        <Icon name='window maximize outline' color='blue' />
                      }
                      closeIcon
                      size='small'
                    >
                      <>
                        <Table textAlign='center'>
                          <Table.Header>
                            <Table.Row>
                              <Table.HeaderCell>Name</Table.HeaderCell>
                              <Table.HeaderCell>Price</Table.HeaderCell>
                              <Table.HeaderCell>Quantity</Table.HeaderCell>
                            </Table.Row>
                          </Table.Header>
                          {item.cartItems.map((i: any, index: number) => (
                            <Table.Body key={index}>
                              <Table.Row>
                                <Table.Cell>{i.name}</Table.Cell>
                                <Table.Cell>{i.price}</Table.Cell>
                                <Table.Cell>${i.quantity}</Table.Cell>
                              </Table.Row>
                            </Table.Body>
                          ))}
                        </Table>
                      </>
                    </Modal>
                  </Table.Cell>
                  <Table.Cell>
                    <Icon
                      onClick={() => deleteOrder(item)}
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
export default OrderStatusTable
