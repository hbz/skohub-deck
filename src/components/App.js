/** @jsx jsx */
import { Component } from 'react'
import { Global, css, jsx } from '@emotion/core'
import emotionNormalize from 'emotion-normalize'
import { CornerLeftUp } from 'react-feather'

import URLInput from './URLInput'
import Column from './Column'

const style = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .columns {
    display:flex;
    flex: 1;
    max-height: 100%;
    width:100%;
    overflow: auto;
  }

  .addNew {
    font-size: 2rem;
    text-align: center;
    margin-top: 20px;
  }
`

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      urls: []
    }
    this.addURL = this.addURL.bind(this)
    this.removeURL = this.removeURL.bind(this)
  }

  addURL (url) {
    this.setState({ urls: [...this.state.urls, url] })
  }

  removeURL (url) {
    this.setState({ urls: this.state.urls.filter(u => u !== url) })
  }

  render () {
    const { urls } = this.state

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
        {urls.length ? (
          <section className="columns">
            {urls.map(url => (
              <Column key={url} url={url} removeURL={this.removeURL}>
              </Column>
            ))}
          </section>
        ) : (
          <div className="addNew" ><CornerLeftUp /> Add a new url</div>
        )}

      </main>
    )
  }
}

export default App
