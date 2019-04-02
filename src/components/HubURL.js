/** @jsx jsx */
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { css, jsx } from '@emotion/core'
import { Loader, Zap, ZapOff, RefreshCw } from 'react-feather'

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

  form {
    display: flex;

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

const HubURL = ({ url, connectionState, connect }) => {
  return (
    <div css={style} className="HubURL">
      {url ? (
        <h2>
          {connectionState === 0 &&
            <Loader/>
          }
          {connectionState === 1 &&
            <Zap/>
          }
          {([2, 3, null].includes(connectionState)) && (
            <ZapOff/>
          )}
          &nbsp;{url}
          {([2, 3, null].includes(connectionState)) && (
            <Fragment>
              &nbsp;<RefreshCw onClick={() => { connect(url) }} />
            </Fragment>
          )}
        </h2>
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
  connectionState: PropTypes.number
}

HubURL.defaultProps = {
  url: undefined,
  connectionState: undefined
}

export default HubURL
