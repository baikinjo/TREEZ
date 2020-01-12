import React, { useContext } from 'react'
import { Container, Menu, Dropdown, Label, Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import { auth } from '../../utils/firebase.utils'
import UserContext from '../../contexts/user.context'
import { CartContext } from '../../providers/cart.provider'
import Cart from '../cart/cart.component'

const Header = () => {
  const currentUser = useContext(UserContext)
  const { itemsCount } = useContext(CartContext)

  return (
    <Menu fixed='top' inverted borderless style={{ height: '5vh' }}>
      <Container>
        <Menu.Item as={Link} to='/' header>
          TREEZ
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item as={Link} to='/inventory'>
            <Icon name='shopping bag' />
            shop
          </Menu.Item>
          <Menu.Item as={Link} to='/orders'>
            <Icon name='truck' />
            order status
          </Menu.Item>
          {currentUser ? (
            <Menu.Item onClick={() => auth.signOut()}>
              <Icon name='sign-out' />
              log out
            </Menu.Item>
          ) : (
            <Menu.Item as={Link} to='/signin'>
              <Icon name='sign-in' />
              login
            </Menu.Item>
          )}
          <Dropdown
            item
            trigger={
              <span>
                <Icon name='cart' />
                carts{' '}
                <Label size='small' color={itemsCount > 0 ? 'red' : undefined}>
                  {itemsCount}
                </Label>
              </span>
            }
            scrolling
          >
            <Dropdown.Menu>
              <Cart />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default Header
