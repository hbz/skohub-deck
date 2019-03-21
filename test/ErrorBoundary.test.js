/* global expect */
/* global describe */
/* global test */

import React from 'react'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import ErrorBoundary from '../src/components/ErrorBoundary'

Enzyme.configure({ adapter: new Adapter() })

// eslint-disable-next-line react/require-render-return
class ErrorComponent extends React.Component {
  render () {
    throw new Error('Oh no!')
  }
}

describe('ErrorBoundary', () => {
  // Disable error to not spam the console
  console.error = () => {}
  const wrapper = mount(
    <ErrorBoundary>
      <ErrorComponent/>
    </ErrorBoundary>
  )

  test('Renders', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('Renders a children without an error', () => {
    const wrapper2 = shallow(
      <ErrorBoundary>
        <div>Correct Component</div>
      </ErrorBoundary>
    )
    expect(wrapper2.text()).toBe('Correct Component')
  })

  test('Catches the error and render the error message', () => {
    expect(wrapper.text().includes('Something went wrong')).toBe(true)
  })
})
