/** @jsx jsx */
import PropTypes from 'prop-types'

import { css, jsx } from '@emotion/core'
import { padding } from '../styles/variables'

const style = css`
  ${padding}
`

const Notification = ({ children }) => {
  return (
    <div css={style} className="Notification" >
      {children}
    </div>
  )
}

Notification.propTypes = {
  children: PropTypes.node.isRequired
}

export default Notification
