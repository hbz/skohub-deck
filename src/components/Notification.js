/** @jsx jsx */
import PropTypes from 'prop-types'

import { css, jsx } from '@emotion/core'
import { padding } from '../styles/variables'

const style = css`
  ${padding}
`

const Notification = ({ message }) => {
  return (
    <div css={style} className="Notification" >
      {message}
    </div>
  )
}

Notification.propTypes = {
  message: PropTypes.string.isRequired
}

export default Notification
