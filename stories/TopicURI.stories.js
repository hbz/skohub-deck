import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import TopicURI from '../src/components/TopicURI'

storiesOf('TopicURI', module)
  .add('Without topic', () => (
    <TopicURI
      addTopic={action('addTopic')}
    />
  ))
  .add('With topic', () => (
    <TopicURI
      topic="Topic name"
    />
  ))
