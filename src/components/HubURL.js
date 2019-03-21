/** @jsx jsx */
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { Loader, Zap, ZapOff } from 'react-feather'

import { colors as c, padding, buttonStyle } from '../styles/variables'

const style = css`
  background-color: ${c.primary};
  padding: 10px 20px;

  h2 {
    margin: 0;
    display: flex;
    color: ${c.base};
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

const HubURL = ({ addURL, url, connectionState }) => {
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
          {(connectionState === 2 ||
            connectionState === 3 ||
            connectionState === null) &&
            <ZapOff/>
          }
          &nbsp;{url}
        </h2>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault()

            const url = e.target.url.value
            if (url) {
              addURL(url)
              e.target.url.value = ''
            }
          }}
        >
          <input required type="url" placeholder="Input a Hub URL to connect" name="url"/>
          <input type="submit" value="Add Hub"/>
        </form>
      )}

    </div>
  )
}

HubURL.propTypes = {
  url: PropTypes.string,
  addURL: PropTypes.func.isRequired,
  connectionState: PropTypes.number
}

HubURL.defaultProps = {
  url: undefined,
  connectionState: undefined
}

export default HubURL
