/** @jsx jsx */
import { Component } from 'react'
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'

import { colors as c } from '../styles/variables'

const style = css`
  background-color: ${c.primary};
  overflow: auto;
  color: white;
  flex: 1;
  padding: 40px;

  h2 {
    font-size: 3rem;
  }
`

class ErrorBoundary extends Component {
  constructor (props) {
    super(props)
    this.state = {
      error: null,
      errorInfo: null
    }
  }

  componentDidCatch (error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  render () {
    const { error, errorInfo } = this.state

    if (errorInfo) {
      return (
        <div css={style} className="ErrorBoundary" >
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {error && error.toString()}
            <br />
            {errorInfo.componentStack}
          </details>
        </div>
      )
    }
    return this.props.children
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
}

export default ErrorBoundary
