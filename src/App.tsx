import React, { useState, useEffect } from 'react'
import './App.css'
import { Route, Switch, Redirect } from 'react-router-dom'
import { GlobalStyle } from './styles/global.styles'
import Header from './components/header/header.component'
import HomePage from './pages/homepage/homepage'
import InventoryPage from './pages/inventory/inventory'
import SignInPage from './pages/signin/signin'
import OrderPage from './pages/order/order'
import CheckoutPage from './pages/checkout/checkout'
import SignIn from './components/signin/signin.component'
import { Container, Segment } from 'semantic-ui-react'
import UserContext from './contexts/user.context'

import { auth, createUserProfileDocument } from './utils/firebase.utils'

const App = () => {
  const [currentUser, $currentUser] = useState<any>(null)

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

  return (
    <>
      <GlobalStyle />
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
        </Switch>
      </Container>
    </>
  )
}

export default App
