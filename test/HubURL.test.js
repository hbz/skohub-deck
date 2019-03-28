/* global expect */
/* global describe */
/* global test */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import HubURL from '../src/components/HubURL'

Enzyme.configure({ adapter: new Adapter() })

let clicked = false
const fakeConnectURL = () => {
  clicked = true
}

describe('HubURL', () => {
  const wrapper = shallow(
    <HubURL
      disconnect={() => {}}
      connect={fakeConnectURL}
      url={null}
    />
  )

  test('Renders', () => {
    expect(wrapper.exists('form')).toBe(true)
  })

  test('Submit form for code coverage', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
      target: {
        url: {
          value: ''
        }
      }
    })

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
      target: {
        url: {
          value: 'http://example.com'
        }
      }
    })
  })

  test('Creates a title when it has a URL', () => {
    wrapper.setProps({ url: 'ws://example.com' })
    expect(wrapper.exists('h2')).toBe(true)
  })

  test('Check connectionState has the right icon', () => {
    wrapper.setProps({ connectionState: 0 })
    expect(wrapper.find('Loader').exists()).toBe(true)

    wrapper.setProps({ connectionState: 1 })
    expect(wrapper.find('Zap').exists()).toBe(true)

    wrapper.setProps({ connectionState: 2 })
    expect(wrapper.find('ZapOff').exists()).toBe(true)
    wrapper.find('RefreshCw').simulate('click')
    expect(clicked).toBe(true)

    wrapper.setProps({ connectionState: 3 })
    expect(wrapper.find('ZapOff').exists()).toBe(true)

    wrapper.setProps({ connectionState: null })
    expect(wrapper.find('ZapOff').exists()).toBe(true)
  })
})
