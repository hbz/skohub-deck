/** @jsx jsx */
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { Link } from 'react-feather'

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

const HubURL = ({ addURL, url }) => {
  return (
    <div css={style} className="HubURL">
      {url ? (
        <h2><Link/>&nbsp;Connected to: {url}</h2>
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
          <input type="submit" value="Subscribe"/>
        </form>
      )}

    </div>
  )
}

HubURL.propTypes = {
  url: PropTypes.string,
  addURL: PropTypes.func.isRequired
}

HubURL.defaultProps = {
  url: undefined
}

export default HubURL
