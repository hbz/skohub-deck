/** @jsx jsx */
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { X } from 'react-feather'

import { colors as c, padding, radius } from '../styles/variables'
import Notification from './Notification'

const style = css`
  flex: 0 0 100%;
  max-width: 250px;
  margin: 10px;
  border: 1px solid ${c.secondary};
  ${radius}

  .NotificationListHeader {
    color: ${c.base};
    background-color: ${c.secondary};
    ${padding}
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const NotificationList = ({ url, removeURL, notifications }) => {
  return (
    <div css={style} className="NotificationList">
      <div className="NotificationListHeader">
        {url} <X onClick={() => {
          removeURL(url)
        }} />
      </div>
      <div>
        {notifications.length ? (
          notifications.map(notification => (
            <Notification key={JSON.stringify(notification)} message={JSON.stringify(notification)} />
          ))
        ) : (
          <div>No notification yet</div>
        )}
      </div>
    </div>
  )
}

NotificationList.propTypes = {
  url: PropTypes.string.isRequired,
  removeURL: PropTypes.func.isRequired,
  notifications: PropTypes.array.isRequired
}

export default NotificationList
