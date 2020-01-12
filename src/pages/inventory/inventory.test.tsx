import React from 'react'
import { shallow } from 'enzyme'

import InventoryPage from './inventory'
import InventoryCard from '../../components/inventory/inventory.card'

describe('Inventory Page', () => {
  let wrapper: any
  let mockItems = [{ id: 1 }]
  beforeEach(() => {
    const mockCollection = {
      items: mockItems,
      title: 'Test'
    }

    wrapper = shallow(<InventoryPage />)
  })

  it('should render the InventoryPage component', () => {
    expect(wrapper).toMatchSnapshot()
  })

  it('should render the same number of Inventory Card as collection array', () => {
    expect(wrapper.find(InventoryCard).length).toBe(mockItems.length)
  })
})
