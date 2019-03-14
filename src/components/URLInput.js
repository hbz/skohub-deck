/** @jsx jsx */
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'

import { colors as c, padding, buttonStyle } from '../styles/variables'

const style = css`
  background-color: ${c.primary};
  padding: 10px 20px;

  form {
    display: flex;

    input[type=search] {
      flex: 1;
      border: 0;
      ${padding};
    }

    input[type=submit] {
      ${buttonStyle}
    }
  }
`

const URLInput = ({ addURL }) => {
  return (
    <div css={style} className="URLInput">
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
        <input type="search" placeholder="Add URL" name="url"/>
        <input type="submit" value="Subscribe"/>
      </form>
    </div>
  )
}

URLInput.propTypes = {
  addURL: PropTypes.func.isRequired
}

export default URLInput
