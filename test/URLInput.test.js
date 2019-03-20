/* global expect */
/* global describe */
/* global test */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import URLInput from '../src/components/URLInput'

Enzyme.configure({ adapter: new Adapter() })

describe('URLInput', () => {
  const wrapper = shallow(<URLInput addURL={() => {}} />)

  test('Renders', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('Submit form for code coverage', () => {
    // Test without url
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
      target: {
        url: {
          value: ''
        }
      }
    })

    // Test with url
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
      target: {
        url: {
          value: 'http://example.com'
        }
      }
    })
  })
})
