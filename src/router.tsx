import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Container, Segment } from 'semantic-ui-react'

import Header from './components/header/header.component'
import HomePage from './pages/homepage/homepage'
import InventoryPage from './pages/inventory/inventory'
import SignInPage from './pages/signin/signin'
import OrderPage from './pages/order/order'
import CheckoutPage from './pages/checkout/checkout'
import SignIn from './components/signin/signin.component'
import NotFound from './components/notfound/not.found'

import UserContext from './contexts/user.context'

const MyRouter = ({ currentUser }: { currentUser: any }) => {
  return (
    <>
      <UserContext.Provider value={currentUser}>
        <Header />
      </UserContext.Provider>
      <Container
        style={{
          paddingTop: '4em',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh'
        }}
      >
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/inventory' component={InventoryPage} />
          <Route
            path='/orders'
            render={() =>
              currentUser ? (
                <OrderPage currentUser={currentUser} />
              ) : (
                <Segment placeholder padded='very'>
                  <SignIn />
                </Segment>
              )
            }
          />
          <Route
            exact
            path='/signin'
            render={() => (currentUser ? <Redirect to='/' /> : <SignInPage />)}
          />
          <Route
            path='/checkout'
            render={() =>
              currentUser ? (
                <CheckoutPage currentUser={currentUser} />
              ) : (
                <SignInPage />
              )
            }
          />
          <Route path='*' component={NotFound} />
        </Switch>
      </Container>
    </>
  )
}

export default MyRouter
