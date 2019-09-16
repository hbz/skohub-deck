/** @jsx jsx */
import { Fragment, Component } from 'react'
import { Global, css, jsx } from '@emotion/core'
import emotionNormalize from 'emotion-normalize'
import { CornerLeftUp } from 'react-feather'

import Header from './Header'
import NotificationList from './NotificationList'
import HubURL from './HubURL'
import TopicURI from './TopicURI'
import ErrorBoundary from './ErrorBoundary'

import { colors as c } from '../styles/variables'

const style = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  main {
    padding: 20px;
    padding-top: 10px;
  }

  .addNew {
    font-size: 2rem;
    text-align: center;
  }
`

class App extends Component {
  constructor (props) {
    const url = new URL(window.location.href)

    super(props)
    this.state = {
      hubURL: url.searchParams.get('hub'),
      topic: url.searchParams.get('topic'),
      socket: null,
      connectionState: null,
      notifications: []
    }
    this.subscribe = this.subscribe.bind(this)
    this.connect = this.connect.bind(this)
    this.disconnect = this.disconnect.bind(this)
    this.removeTopic = this.removeTopic.bind(this)
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

  removeTopic () {
    this.setState({ topic: null })
  }

  connect (hubURL, cb) {
    const socket = new WebSocket(hubURL)

    socket.onerror = (error) => {
      this.setState({ connectionState: error.target.readyState })
      cb && cb(error.target.readyState)
      throw (error)
    }

    socket.addEventListener('open', (event) => {
      this.setState({ connectionState: event.target.readyState })
      cb && cb(event.target.readyState)
    })

    socket.addEventListener('close', (event) => {
      this.setState({ connectionState: event.target.readyState })
      cb && cb(event.target.readyState)
    })

    socket.addEventListener('message', (event) => {
      const { notifications } = this.state
      this.setState({ notifications: [{ data: JSON.parse(event.data), timeStamp: event.timeStamp }, ...notifications] })
    })
    this.setState({ socket, hubURL })
  }

  componentDidMount() {
    const { connect, subscribe, state: { hubURL, topic } } = this

    hubURL && connect(hubURL, (connectionState) => {
      connectionState === 1 && topic && subscribe(topic)
    })
  }

  render () {
    const { hubURL, topic, socket, notifications, connectionState } = this.state

    return (
      <div css={style} className="App">
        <Global
          styles={css`
            ${emotionNormalize}

            html {
              -webkit-box-sizing: border-box;
              -moz-box-sizing: border-box;
              box-sizing: border-box;
            }

            *, *:before, *:after {
              -webkit-box-sizing: inherit;
              -moz-box-sizing: inherit;
              box-sizing: inherit;
            }

            body {
              padding: 0;
              margin: 0;
              word-wrap: break-word;
              font-size: 16px;
              font-family: futura-pt, sans-serif, sans-serif;
              color: ${c.text};
              background-color: ${c.base};
            }

            pre {
              white-space: pre-wrap;
              word-wrap: break-word;
            }

            a {
              text-decoration: none;
              color: ${c.primary};

              &:hover {
                color: ${c.accent};
              }
            }

            .inputStyle {
              background-color: ${c.inputBase};
              box-shadow: 2px 2px 0 0 ${c.primary};
              border: none;
              cursor: pointer;
              border: 1px solid ${c.primary};
              color: ${c.primary};

              &:hover,
              &:focus {
                background-color: ${c.inputAction};
              }
            }

            .block {
              background-color: ${c.blockBase};
              box-shadow: 0 2px 4px 0 hsla(198, 45%, 10%, .12);
              padding: 20px;
              border-radius: 8px;
            }
          `}
        />
        <ErrorBoundary>

          <Header>
           <HubURL
                connect={this.connect}
                url={hubURL}
                connectionState={connectionState}
                disconnect={this.disconnect}
              />
          </Header>

          <main>
            {hubURL && socket ? (
              <Fragment>
                <TopicURI removeTopic={this.removeTopic} subscribe={this.subscribe} topic={topic} />
                {!topic && (
                  <div className="addNew" ><CornerLeftUp /> Add a new topic</div>
                )}
                {socket && topic && (
                  <NotificationList
                    notifications={notifications}
                    url={hubURL}
                    disconnect={this.disconnect}
                  />
                )}
              </Fragment>
            ) : (
              <div className="addNew" ><CornerLeftUp /> Add a new url</div>
            )}
          </main>

        </ErrorBoundary>
      </div>
    )
  }
}

export default App
