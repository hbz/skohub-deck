/* global expect */
/* global describe */
/* global test */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import NotificationList from '../src/components/NotificationList'

Enzyme.configure({ adapter: new Adapter() })

describe('NotificationList', () => {
  const wrapper = shallow(
    <NotificationList
      disconnect={() => {}}
      notifications={[]}
    />
  )

  const fakeData = [{ data: 'foo', timeStamp: 5154 }]

  test('Renders', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.notificationListHeader').text()).toBe('Notifications')
    expect(wrapper.find('.notificationListContent').children().prop('children')).toBe('No notifications yet')
  })

  test('Check the number of elements', () => {
    expect(wrapper.find('Notification').length).toBe(1)
    fakeData.unshift({ data: 'bar', timeStamp: 6768 })
    wrapper.setProps({ notifications: fakeData })
    expect(wrapper.find('Notification').length).toBe(2)
  })

  test('Check if the new element is at the beginning', () => {
    expect(JSON.parse(wrapper.find('Notification').last().find('pre').text())).toBe('foo')
    fakeData.unshift({ data: 'baz', timeStamp: 8848 })
    wrapper.setProps({ notifications: fakeData })
    expect(JSON.parse(wrapper.find('Notification').first().find('pre').text())).toBe('baz')
  })
})
