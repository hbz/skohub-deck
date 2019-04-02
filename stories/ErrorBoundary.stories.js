import React from 'react'
import { storiesOf } from '@storybook/react'

import ErrorBoundary from '../src/components/ErrorBoundary'

// eslint-disable-next-line react/require-render-return
class ErrorComponent extends React.Component {
  render () {
    throw new Error('Oh no!')
  }
}

storiesOf('ErrorBoundary', module)
  .add('Without error component', () => (
    <ErrorBoundary>
      <div>Child Without Error</div>
    </ErrorBoundary>
  ), { notes: 'Renders a normal component instead on creating an error page' })
  .add('With error component', () => (
    <ErrorBoundary>
      <ErrorComponent/>
    </ErrorBoundary>
  ), { notes: 'Triggers an error page' })
