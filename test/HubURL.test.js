/* global expect */
/* global describe */
/* global test */

import React from 'react'
import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import WS from 'jest-websocket-mock'

import HubURL from '../src/components/HubURL'

Enzyme.configure({ adapter: new Adapter() })

const fakeURL = 'ws://localhost:8080'
const server = new WS(fakeURL)

describe('HubURL', () => {
  test('Connects to fake WS', async () => {
    shallow(<HubURL hubURL={fakeURL} removeURL={() => {}}/>)
    await server.connected
    await expect(server).toReceiveMessage('Hello Server from client!')
    await server.send('Test')
    server.error()
  })
})
