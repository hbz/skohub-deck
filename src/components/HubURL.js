import React, { Component } from 'react'
import PropTypes from 'prop-types'

import NotificationList from './NotificationList'

class HubURL extends Component {
  constructor (props) {
    super(props)
    this.state = {
      connection: null
    }
    this.connectURL = this.connectURL.bind(this)
  }

  componentDidMount () {
    const { hubURL } = this.props
    this.connectURL(hubURL)
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

    // Listen for messages
    socket.addEventListener('message', (event) => {
      console.log('Message from server:', event.data)
    })
  }

  render () {
    const { hubURL, removeURL } = this.props
    return (
      this.state.connection && (
        <NotificationList url={hubURL} removeURL={removeURL} />
      )
    )
  }
}

HubURL.propTypes = {
  hubURL: PropTypes.string.isRequired,
  removeURL: PropTypes.func.isRequired
}

export default HubURL
