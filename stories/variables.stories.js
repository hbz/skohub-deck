import React from 'react'
import { storiesOf } from '@storybook/react'

import { colors } from '../src/styles/variables'

storiesOf('Variables', module)
  .add('Colors', () => (
    Object.keys(colors).map(name => (
      <div key="name">
        {name}: {colors[name]} <div style={{ backgroundColor: colors[name], width: '25px', height: '25px', display: 'inline-block' }}></div>
      </div>
    ))
  ))
