/** @jsx jsx */
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { css, jsx } from '@emotion/core'
import { Loader, Zap, ZapOff, RefreshCw, CloudOff } from 'react-feather'

import { colors as c, padding, buttonStyle } from '../styles/variables'

const style = css`
  background-color: ${c.primary};
  padding: 10px 20px;

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
      border: 0;
      ${padding};
    }

    input[type=submit] {
      ${buttonStyle}
    }
  }
`

const HubURL = ({ url, connectionState, connect, disconnect }) => {
  return (
    <div css={css`
      ${style}
      background-color: ${connectionState === 1 ? c.connection : null};
    `} className="HubURL">
      {url ? (
        <div className="title">
          <h2>
            {connectionState === 0 &&
              <Loader title="Connecting"/>
            }
            {connectionState === 1 &&
              <Zap title="Connected"/>
            }
            {([2, 3, null].includes(connectionState)) && (
              <ZapOff title="Disconnected"/>
            )}
            &nbsp;{url}
          </h2>
          <div>
            {(url && [0, 1].includes(connectionState)) &&
              <CloudOff onClick={disconnect} title="Close" />
            }
            {(url && [2, 3, null].includes(connectionState)) && (
              <Fragment>
                &nbsp;<RefreshCw onClick={() => { connect(url) }} />
              </Fragment>
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
          <input aria-label="url" required type="url" placeholder="Input a Hub URL to connect" name="url"/>
          <input type="submit" value="Add Hub"/>
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
