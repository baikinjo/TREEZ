import React from 'react'
import { Segment, Divider, Grid, Header } from 'semantic-ui-react'

import SignIn from '../../components/signin/signin.component'
import SignUp from '../../components/signup/signup.component'

const SignInPage = () => (
  <>
    <Segment placeholder padded='very' style={{ width: '80%' }}>
      <Grid columns={2} stackable>
        <Grid.Column verticalAlign='middle'>
          <Header textAlign='center' as='h2'>
            I have an account.
          </Header>
          <SignIn />
        </Grid.Column>

        <Grid.Column verticalAlign='middle'>
          <Header textAlign='center' as='h2'>
            I do not have an account.
          </Header>
          <SignUp />
        </Grid.Column>
      </Grid>

      <Divider vertical>Or</Divider>
    </Segment>
  </>
)

export default SignInPage
