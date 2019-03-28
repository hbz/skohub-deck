/* global expect */
/* global describe */
/* global test */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import WS from 'jest-websocket-mock'

import App from '../src/components/App'

Enzyme.configure({ adapter: new Adapter() })

const fakeURL = 'ws://localhost:8080'
const server = new WS(fakeURL)

describe('App', () => {
  const wrapper = shallow(<App />)
  const instance = wrapper.instance()

  test('Renders', () => {
    expect(wrapper.exists()).toBe(true)
  })

  test('Method connect', () => {
    expect(wrapper.find('.columns').children().length).toBe(0)
    expect(wrapper.state('hubURL')).toBe(null)
    instance.connect(fakeURL)
    expect(wrapper.state('hubURL')).toBe(fakeURL)
  })

  test('Method subscribe', () => {
    instance.subscribe('Test topic')
    expect(wrapper.state('topic')).toBe('Test topic')
    expect(wrapper.find('.columns').children().length).toBe(1)
  })


  test('Connects to fake WS', async () => {
    await server.connected
    await expect(server).toReceiveMessage(JSON.stringify({ 'mode': 'subscribe', 'topic': 'Test topic' }))
    await server.send('Test')
  })

  test('Throws error on server error', async () => {
    try {
      await server.error()
    } catch (error) {
      expect(error.type).toBe('error')
    }
  })

  test('Close connection from server', async () => {
    await server.close()
    expect(wrapper.state('connectionState')).toBe(1)
  })

  test('Method disconnect', () => {
    expect(wrapper.find('.columns').children().length).toBe(1)
    expect(wrapper.state('hubURL')).toBe(fakeURL)
    expect(wrapper.state('topic')).toBe('Test topic')
    instance.disconnect()
    expect(wrapper.prop('socket')).toBe(undefined)
  })

  test('Method removeTopic', () => {
    expect(wrapper.state('topic')).toBe('Test topic')
    instance.removeTopic()
    expect(wrapper.state('topic')).toBe(null)
    expect(wrapper.find('.columns').children().length).toBe(0)
  })
})
