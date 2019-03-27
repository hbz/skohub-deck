/** @jsx jsx */
import { Fragment, Component } from 'react'
import { Global, css, jsx } from '@emotion/core'
import emotionNormalize from 'emotion-normalize'
import { CornerLeftUp } from 'react-feather'

import NotificationList from './NotificationList'
import HubURL from './HubURL'
import TopicURI from './TopicURI'
import ErrorBoundary from './ErrorBoundary'

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
    padding: 10px;
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
      hubURL: null,
      topic: null,
      socket: null,
      connectionState: null,
      notifications: []
    }
    this.subscribe = this.subscribe.bind(this)
    this.connect = this.connect.bind(this)
    this.disconnect = this.disconnect.bind(this)
  }

  subscribe (topic) {
    this.state.socket &&
    this.state.socket.send(JSON.stringify({
      'mode': 'subscribe',
      topic
    }))
    this.setState({ topic })
  }

  disconnect () {
    this.state.socket.close()
  }

  connect (hubURL) {
    const socket = new WebSocket(hubURL)

    socket.onerror = (error) => {
      this.setState({ connectionState: error.target.readyState })
      throw (error)
    }

    socket.addEventListener('open', (event) => {
      this.setState({ connectionState: event.target.readyState })
    })

    socket.addEventListener('close', (event) => {
      this.setState({ connectionState: event.target.readyState })
    })

    socket.addEventListener('message', (event) => {
      const { notifications } = this.state
      this.setState({ notifications: [{ data: event.data, timeStamp: event.timeStamp }, ...notifications] })
    })
    this.setState({ socket, hubURL })
  }

  render () {
    const { hubURL, topic, socket, notifications, connectionState } = this.state

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
              box-sizing: border-box;
            }
            *, *:before, *:after {
              -webkit-box-sizing: inherit;
              -moz-box-sizing: inherit;
              box-sizing: inherit;
            }
          `}
        />
        <ErrorBoundary>
          <HubURL
            connect={this.connect}
            url={hubURL}
            connectionState={connectionState}
          />
          {hubURL && socket ? (
            <Fragment>
              <TopicURI subscribe={this.subscribe} topic={topic} />
              {!topic && (
                <div className="addNew" ><CornerLeftUp /> Add a new topic</div>
              )}
              <section className="columns">
                {socket && topic &&
                  <NotificationList
                    notifications={notifications}
                    url={hubURL}
                    disconnect={this.disconnect}
                  />
                }
              </section>
            </Fragment>
          ) : (
            <div className="addNew" ><CornerLeftUp /> Add a new url</div>
          )}
        </ErrorBoundary>
      </main>
    )
  }
}

export default App
