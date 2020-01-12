import React from 'react'
import { shallow } from 'enzyme'

import OrderPage from './order'
import { USER_TYPE } from '../../utils/types'

describe('Order Page', () => {
  let wrapper: any
  beforeEach(() => {
    const currentUser: USER_TYPE = {}

    wrapper = shallow(<OrderPage currentUser={currentUser} />)
  })

  it('should render the Order Page component', () => {
    expect(wrapper).toMatchSnapshot()
  })
})
