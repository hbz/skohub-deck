import React from 'react'
import { storiesOf } from '@storybook/react'

import Notification from '../src/components/Notification'

storiesOf('Notification', module)
  .add('With text', () => (
    <Notification message="New Notification" />
  ))
