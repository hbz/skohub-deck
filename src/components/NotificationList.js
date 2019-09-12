/** @jsx jsx */
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'

import { colors as c, padding, radius } from '../styles/variables'
import Notification from './Notification'

const style = css`
  h2 {
    margin: 0;
    position: relative;
    padding-bottom: 10px;

    &:before {
      position: absolute;
      background: #f5f7f9;
      bottom: 0;
      content: "";
      display: block;
      height: 2px;
      left: 0;
      right: 0;
    }
  }

  .notificationListContent {
    flex: 1;
    overflow-y: auto;

    & div:nth-child(even) {
      background-color: hsl(0, 0%, 98%);
    }
  }

  div:last-child > * {
    border-bottom: 2px solid ${c.base};

    &:last-child {
      border-bottom: none;
    }
  }

`

const NotificationList = ({ notifications }) => {
  return (
    <div css={style} className="NotificationList block">
      <h2>
        Notifications
      </h2>
      <div className="notificationListContent">
        {notifications.length ? (
          notifications.map(notification => (
            <Notification key={notification.timeStamp}>
              <pre>
                {JSON.stringify(notification.data, null, 2)}
              </pre>
            </Notification>
          ))
        ) : (
          <Notification>
            No notifications yet
          </Notification>
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
