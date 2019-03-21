/* global expect */
/* global describe */
/* global test */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import TopicURI from '../src/components/TopicURI'

Enzyme.configure({ adapter: new Adapter() })

describe('TopicURI', () => {
  const wrapper = shallow(<TopicURI addTopic={() => {}} topic={null} />)

  test('Renders', () => {
    expect(wrapper.exists('form')).toBe(true)
    expect(wrapper.exists()).toBe(true)
  })

  test('Submit form for code coverage', () => {
    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
      target: {
        uri: {
          value: ''
        }
      }
    })

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {},
      target: {
        uri: {
          value: 'Example topic'
        }
      }
    })
  })

  test('Creates a h3 title when it has a Topic', () => {
    wrapper.setProps({ topic: 'Example topic' })
    expect(wrapper.exists('h3')).toBe(true)
  })
})
