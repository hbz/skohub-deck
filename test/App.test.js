/* global expect */
/* global describe */
/* global test */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import App from '../src/components/App'

Enzyme.configure({ adapter: new Adapter() })

describe('App', () => {
  const wrapper = shallow(<App />)
  const instance = wrapper.instance()

  test('Renders', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('Method addURL', () => {
    expect(wrapper.find('.columns').children().length).toBe(0)
    expect(wrapper.state('urls').length).toBe(0)
    instance.addURL('https://example.com')
    expect(wrapper.state('urls').includes('https://example.com')).toBe(true)
    expect(wrapper.find('.columns').children().length).toBe(1)
  })

  test('Method removeURL', () => {
    expect(wrapper.find('.columns').children().length).toBe(1)
    expect(wrapper.state('urls').includes('https://example.com')).toBe(true)
    instance.removeURL('https://example.com')
    expect(wrapper.state('urls').includes('https://example.com')).toBe(false)
    expect(wrapper.find('.columns').children().length).toBe(0)
  })
})
