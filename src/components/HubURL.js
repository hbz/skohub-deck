/** @jsx jsx */
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { css, jsx } from '@emotion/core'
import { Loader, Zap, ZapOff, RefreshCw, CloudOff } from 'react-feather'

import { colors as c, padding, buttonStyle } from '../styles/variables'

const style = css`
  padding-bottom: 20px;
  flex: 1;

  button.inputStyle svg {
    padding: 2px;
    position: relative;
    top: 2px;
  }

  h2 {
    margin: 0;
    display: flex;
    color: ${c.text};
    align-items: center;
  }

  form,
  .title {
    color: ${c.text};
    display: flex;
    justify-content: space-between;

    input[type=url] {
      flex: 1;
      ${padding};
    }

    input[type=submit] {
      margin-left: 10px;
    }
  }
`

const HubURL = ({ url, connectionState, connect, disconnect }) => {
  return (
    <div css={css`
      ${style}
    `} className="HubURL">
      {url ? (
        <div className="title">
          <h2>
            {connectionState === 0 &&
              <Loader title="Connecting"/>
            }
            {connectionState === 1 &&
              <Zap
                style={{stroke: c.accent}}
                title="Connected"
              />
            }
            {([2, 3, null].includes(connectionState)) && (
              <ZapOff
                style={{stroke: c.error}}
                title="Disconnected"
              />
            )}
            &nbsp;{url}
          </h2>
          <div>
            {(url && [0, 1].includes(connectionState)) &&
              <button
                className="inputStyle"
                onClick={disconnect}
                title="Disconnect"
              >
                <CloudOff/>
              </button>

            }
            {(url && [2, 3, null].includes(connectionState)) && (
              <button
                className="inputStyle"
                onClick={() => { connect(url) }}
                title="Reconnect"
              >
                <RefreshCw/>
              </button>
            )}
          </div>
        </div>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault()

            const url = e.target.url.value
            if (url) {
              connect(url)
              e.target.url.value = ''
            }
          }}
        >
          <input className="inputStyle" aria-label="url" required type="url" placeholder="Input a Hub URL to connect" name="url"/>
          <input className="inputStyle" type="submit" value="Add Hub"/>
        </form>
      )}

    </div>
  )
}

HubURL.propTypes = {
  url: PropTypes.string,
  connect: PropTypes.func.isRequired,
  disconnect: PropTypes.func.isRequired,
  connectionState: PropTypes.number
}

HubURL.defaultProps = {
  url: undefined,
  connectionState: undefined
}

export default HubURL
