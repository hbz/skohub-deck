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
      addURL={action('addURL')}
      connectURL={action('connectURL')}
    />
  ))
  .add('Connecting', () => (
    <HubURL
      addURL={action('addURL')}
      connectURL={action('connectURL')}
      url="ws://localhost:3333"
      connectionState={0}
    />
  ))
  .add('Connected', () => (
    <HubURL
      addURL={action('addURL')}
      connectURL={action('connectURL')}
      url="ws://localhost:3333"
      connectionState={1}
    />
  ))
  .add('Disconnected', () => (
    <HubURL
      addURL={action('addURL')}
      connectURL={action('connectURL')}
      url="ws://localhost:3333"
      connectionState={3}
    />
  ))
  .add('Disconnected and with topic', () => (
    <HubURL
      addURL={() => {}}
      connectURL={() => {}}
      url="ws://localhost:3333"
      connectionState={3}
      topic="Fake topic"
    />
  ))
  .add('Interactive', () => (
    <HubURL
      addURL={action('addURL')}
      connectURL={action('connectURL')}
      url={text('Url', 'ws://localhost:3333')}
      connectionState={+radios(label, options, 3)}
      topic={text('Topic', 'Test Topic')}
    />
  ))
