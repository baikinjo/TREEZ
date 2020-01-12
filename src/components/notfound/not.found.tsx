import React from 'react'
import { Segment, Header, Button, Divider } from 'semantic-ui-react'
import { useHistory } from 'react-router-dom'

const NotFound = () => {
  const history = useHistory()
  return (
    <>
      <Segment placeholder padded='very' size='massive'>
        <Header as='h2'>This Page Does Not Exist</Header>
        <Divider clearing />
        <Button color='instagram' onClick={() => history.push('/')}>
          Back to Main
        </Button>
      </Segment>
    </>
  )
}

export default NotFound
