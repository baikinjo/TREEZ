import React from 'react'
import { shallow } from 'enzyme'
import SingInPage from './signin'

it('should render sign in page component', () => {
  expect(shallow(<SingInPage />)).toMatchSnapshot()
})
