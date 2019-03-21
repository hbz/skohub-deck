/* global expect */
/* global describe */
/* global test */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NotificationList from '../src/components/NotificationList'

Enzyme.configure({ adapter: new Adapter() })

let clicked = false
const fakeRemoveURL = () => {
  clicked = true
}

describe('NotificationList', () => {
  const wrapper = shallow(
    <NotificationList
      url="http://example.com"
      removeURL={fakeRemoveURL}
      notifications={[]}
    />
  )

  test('Renders', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.notificationListHeader').text()).toBe('Notifications <X />')
    expect(wrapper.find('div').last().children().prop('message')).toBe('No notifications yet')
  })

  test('Check the number of elements', () => {
    expect(wrapper.find('Notification').length).toBe(1)
    wrapper.setProps({ notifications: ['foo', 'bar'] })
    expect(wrapper.find('Notification').length).toBe(2)
  })

  test('Test removeURL', () => {
    expect(clicked).toBe(false)
    wrapper.find('X').simulate('click')
    expect(clicked).toBe(true)
  })
})
