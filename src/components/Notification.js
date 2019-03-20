/** @jsx jsx */
import PropTypes from 'prop-types'

import { css, jsx } from '@emotion/core'
import { colors as c, padding } from '../styles/variables'

const style = css`
  ${padding}
  border-bottom: 1px solid ${c.secondary};
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
