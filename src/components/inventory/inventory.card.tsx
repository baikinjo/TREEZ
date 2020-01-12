import React, { useState, useContext } from 'react'
import { Card, Button, Modal } from 'semantic-ui-react'

import { ITEM_TYPE, CART_ITEM_TYPE } from '../../utils/types'
import { CartContext } from '../../providers/cart.provider'

const InventoryCard = ({ inventory }: { inventory: ITEM_TYPE }) => {
  const [modal, $modal] = useState(false)
  const [selected, $selected] = useState<any>([])
  const { addItem } = useContext(CartContext)

  const onSelect = (item: any) => {
    $selected(item)
    $modal(true)
  }
  const onClose = () => {
    $selected([])
    $modal(false)
  }

  const onQuickAdd = (item: CART_ITEM_TYPE) => {
    const single = {
      name: item.name,
      quantity: 1,
      price: Number(item.price),
      id: item.id
    }

    addItem(single)
    onClose()
  }

  return (
    <div style={{ height: '100%', padding: 24 }}>
      {inventory ? (
        <>
          <h2 style={{ marginBottom: 48 }}>{inventory.title.toUpperCase()}</h2>
          <Card.Group itemsPerRow={3}>
            {inventory.items.map((item: any) => (
              <Card key={item.id}>
                <Card.Content>
                  <Card.Header textAlign='center'>{item.name}</Card.Header>
                  <Card.Meta textAlign='center'>
                    stock: {item.quantity} | ${item.price} CAD
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <div className='ui two buttons'>
                    <Button onClick={() => onSelect(item)} color='black'>
                      View
                    </Button>
                    <Button onClick={() => onQuickAdd(item)} color='teal'>
                      Quick Add
                    </Button>

                    <Modal size='mini' open={modal} onClose={onClose} closeIcon>
                      <Modal.Header>{selected.name}</Modal.Header>
                      <Modal.Content>
                        <Modal.Description>
                          {selected.description}
                          <p>
                            stock: {selected.quantity} | ${selected.price}
                          </p>
                        </Modal.Description>
                      </Modal.Content>
                      <Modal.Actions>
                        <Button
                          color='teal'
                          onClick={() => onQuickAdd(selected)}
                        >
                          Add Item
                        </Button>
                      </Modal.Actions>
                    </Modal>
                  </div>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </>
      ) : (
        <p>Loading</p>
      )}
    </div>
  )
}

export default InventoryCard
