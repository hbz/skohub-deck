/* global expect */
/* global describe */
/* global test */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import HubURL from '../src/components/HubURL'

Enzyme.configure({ adapter: new Adapter() })

describe('HubURL', () => {
  const wrapper = shallow(<HubURL addURL={() => {}} url={null} />)

  test('Renders', () => {
    expect(wrapper.exists('form')).toBe(true)
    expect(wrapper.exists()).toBe(true)
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
    expect(wrapper.exists()).toBe(true)
  })
})
