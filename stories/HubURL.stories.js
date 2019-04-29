import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, radios, text } from '@storybook/addon-knobs'

import HubURL from '../src/components/HubURL'

const label = 'connectionState'
const options = {
  CONNECTING: '0',
  OPEN: '1',
  CLOSING: '2',
  CLOSED: '3'
}

storiesOf('HubURL', module)
  .addDecorator(withKnobs)
  .add('Without url', () => (
    <HubURL
      connect={action('connect')}
      discconect={action('discconect')}
    />
  ))
  .add('Connecting', () => (
    <HubURL
      connect={action('connect')}
      discconect={action('discconect')}
      url="ws://localhost:3333"
      connectionState={0}
    />
  ))
  .add('Connected', () => (
    <HubURL
      connect={action('connect')}
      discconect={action('discconect')}
      url="ws://localhost:3333"
      connectionState={1}
    />
  ))
  .add('Disconnected', () => (
    <HubURL
      connect={action('connect')}
      discconect={action('discconect')}
      url="ws://localhost:3333"
      connectionState={3}
    />
  ))
  .add('Interactive', () => (
    <HubURL
      connect={action('connect')}
      discconect={action('discconect')}
      url={text('Url', 'ws://localhost:3333')}
      connectionState={+radios(label, options, 3)}
    />
  ))
