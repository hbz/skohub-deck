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
      notifications: []
    }
    this.addURL = this.addURL.bind(this)
    this.addTopic = this.addTopic.bind(this)
    this.removeURL = this.removeURL.bind(this)
  }

  addURL (url) {
    this.setState({ urls: [...this.state.urls, url] })
  }

  addTopic (topic) {
    this.setState({ topic })
    this.connectURL(this.state.urls[0])
  }

  removeURL (url) {
    this.setState({
      urls: this.state.urls.filter(u => u !== url),
      topic: null
    })
  }

  connectURL (hubURL) {
    const socket = new WebSocket(hubURL)
    this.setState({ connection: socket })

    socket.addEventListener('open', (event) => {
      socket.send('Hello Server from client!')
    })

    socket.addEventListener('error', (error) => {
      console.error('Error connecting', error)
    })

    socket.addEventListener('message', (event) => {
      console.log('Message from server:', event.data)
      this.setState({ notifications: [...this.state.notifications, event.data] })
    })
  }

  render () {
    const { urls, topic } = this.state
    const { connection, notifications } = this.state

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
        <HubURL addURL={this.addURL} url={(urls.length && urls[0]) || null} />
        {urls.length ? (
          <Fragment>
            <TopicURI addTopic={this.addTopic} topic={topic} />
            <section className="columns">
              {connection && urls.map(url => (
                <NotificationList key={url} h notifications={notifications} url={url} removeURL={this.removeURL} />
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
