import React from 'react'
import { Link } from 'react-router-dom'
import { Segment, Container, Header, Button } from 'semantic-ui-react'

const HomePage = () => (
  <>
    <Segment textAlign='center' vertical>
      <Container>
        <Header as='h1'>Welcome to TREEZ</Header>
        <Button size='massive' as={Link} to='/inventory' color='teal'>
          Shop Inventory
        </Button>
      </Container>
    </Segment>
  </>
)

export default HomePage
