/** @jsx jsx */
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { X } from 'react-feather'

import { colors as c, padding, radius } from '../styles/variables'
import Notification from './Notification'

const style = css`
  flex: 0 0 100%;
  max-width: 250px;
  border: 1px solid ${c.secondary};
  ${radius}
  display: flex;
  flex-direction: column;
  height: 100%;

  .notificationListHeader {
    color: ${c.text};
    background-color: ${c.secondary};
    ${padding}
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .notificationListContent {
    flex: 1;
    overflow-y: auto;
  }

  div:last-child > * {
    border-bottom: 1px solid ${c.secondary};

    &:last-child {
      border-bottom: none;
    }
  }

`

const NotificationList = ({ notifications }) => {
  return (
    <div css={style} className="NotificationList">
      <div className="notificationListHeader">
        Notifications
      </div>
      <div className="notificationListContent">
        {notifications.length ? (
          notifications.map(notification => (
            <Notification key={notification.timeStamp} message={notification.data} />
          ))
        ) : (
          <Notification message='No notifications yet' />
        )}
      </div>
    </div>
  )
}

NotificationList.propTypes = {
  notifications: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    timeStamp: PropTypes.number
  })).isRequired
}

export default NotificationList
