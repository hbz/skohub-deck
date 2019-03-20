/* global expect */
/* global describe */
/* global test */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import Notification from '../src/components/Notification'

Enzyme.configure({ adapter: new Adapter() })

describe('Notification', () => {
  const wrapper = shallow(<Notification message="Test message" />)

  test('Renders', () => {
    expect(wrapper.exists()).toBe(true)
  })
  test('Set the message text', () => {
    expect(wrapper.text()).toBe('Test message')
  })
})
