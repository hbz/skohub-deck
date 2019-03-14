/** @jsx jsx */
import { Component } from 'react'
import { render } from 'react-dom'
import { Global, css, jsx } from '@emotion/core'
import emotionNormalize from 'emotion-normalize'

import URLInput from './components/URLInput'

const style = css`
  min-height: 100vh;
`

export default class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      urls: []
    }
    this.addURL = this.addURL.bind(this)
  }

  addURL (url) {
    this.setState({ urls: [...this.state.urls, url] })
  }

  render () {
    return (
      <main css={style} className="App">
        <Global
          styles={css`
            ${emotionNormalize}
            html,
            body {
              padding: 0;
              margin: 0;
              font-size: 16px;
              font-family: Helvetica, Arial, sans-serif;
            }
          `}
        />
        <URLInput addURL={this.addURL} />
      </main>
    )
  }
}

render(<App />, document.getElementById('App'))
