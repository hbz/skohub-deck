/** @jsx jsx */
import { Fragment, Component } from 'react'
import { Global, css, jsx } from '@emotion/core'
import emotionNormalize from 'emotion-normalize'
import { CornerLeftUp } from 'react-feather'

import NotificationList from './NotificationList'
import HubURL from './HubURL'
import TopicURI from './TopicURI'

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
      urls: [],
      topic: null,
      connection: null,
      connectionState: null,
      notifications: []
    }
    this.addURL = this.addURL.bind(this)
    this.addTopic = this.addTopic.bind(this)
    this.removeURL = this.removeURL.bind(this)
  }

  addURL (url) {
    const { urls } = this.state

    this.setState({ urls: [...urls, url] })
  }

  addTopic (topic) {
    const { urls } = this.state

    this.setState({ topic })
    this.connectURL(urls[0])
  }

  removeURL (url) {
    const { connection, urls } = this.state

    this.setState({
      urls: urls.filter(u => u !== url),
      topic: null,
      notifications: []
    })
    connection.close()
  }

  connectURL (hubURL) {
    const socket = new WebSocket(hubURL)

    socket.onerror = (error) => {
      this.setState({ connectionState: error.target.readyState })
      throw (error)
    }

    socket.addEventListener('open', (event) => {
      this.setState({ connectionState: event.target.readyState })
      socket.send('Hello Server from client!')
    })

    socket.addEventListener('close', (event) => {
      this.setState({ connectionState: event.target.readyState })
    })

    socket.addEventListener('message', (event) => {
      const { notifications } = this.state

      this.setState({ notifications: [...notifications, event.data] })
    })
    this.setState({ connection: socket })
  }

  render () {
    const { urls, topic } = this.state
    const { connection, notifications, connectionState } = this.state

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
        <HubURL addURL={this.addURL} url={(urls.length && urls[0]) || null} connectionState={connectionState} />
        {urls.length ? (
          <Fragment>
            <TopicURI addTopic={this.addTopic} topic={topic} />
            {!topic && (
              <div className="addNew" ><CornerLeftUp /> Add a new topic</div>
            )}
            <section className="columns">
              {(connection && topic) && urls.map(url => (
                <NotificationList key={url} notifications={notifications} url={url} removeURL={this.removeURL} />
              ))}
            </section>
          </Fragment>
        ) : (
          <div className="addNew" ><CornerLeftUp /> Add a new url</div>
        )}

      </main>
    )
  }
}

export default App
