import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import NotificationList from '../src/components/NotificationList'

storiesOf('NotificationList', module)
  .add('Without Notifications', () => (
    <NotificationList notifications={[]} removeURL={action('removeURL')} />
  ))
  .add('With Notifications', () => (
    <NotificationList
      notifications={[
        { data: 'Foo', timeStamp: 123 },
        { data: 'Bar', timeStamp: 456 }
      ]}
      removeURL={action('removeURL')}
    />
  ))
  .add('With scroll', () => {
    let randomNotifications = []
    for (let i = 0; i < 100; i++) {
      randomNotifications.push({ data: `Element ${i}`, timeStamp: i })
    }

    return (
      <div style={{
        overflow: 'hidden',
        height: '300px',
        paddingBottom: '10px'
      }}>
        <NotificationList notifications={randomNotifications} removeURL={action('removeURL')} />
      </div>
    )
  })
