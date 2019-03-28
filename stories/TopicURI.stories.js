import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import TopicURI from '../src/components/TopicURI'

storiesOf('TopicURI', module)
  .add('Without topic', () => (
    <TopicURI
      subscribe={action('subscribe')}
      removeTopic={action('removeTopic')}
    />
  ))
  .add('With topic', () => (
    <TopicURI
      subscribe={action('subscribe')}
      removeTopic={action('removeTopic')}
      topic="Topic name"
    />
  ))
