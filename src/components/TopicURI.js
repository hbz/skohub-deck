/** @jsx jsx */
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { Radio, X } from 'react-feather'

import { colors as c, padding, buttonStyle } from '../styles/variables'

const style = css`
  background-color: ${c.primary};
  padding: 10px 20px;
  border-top: 1px solid ${c.base};

  h3 {
    margin: 0;
    display: flex;
    color: ${c.text};
    align-items: center;
  }

  form,
  .title {
    color: ${c.text};
    display: flex;
    justify-content: space-between;

    input[type=text] {
      flex: 1;
      border: 0;
      ${padding};
    }

    input[type=submit] {
      ${buttonStyle}
    }
  }
`

const TopicURI = ({ subscribe, topic, removeTopic }) => {
  return (
    <div css={css`
      ${style}
      background-color: ${topic ? c.accent : null};
    `} className="TopicURI">
      {topic ? (
        <div className="title">
          <h3><Radio />&nbsp;Using the topic: {topic}</h3>
          <X onClick={removeTopic} title="Remove Topic" />
        </div>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault()

            const uri = e.target.uri.value
            if (uri) {
              subscribe(uri)
              e.target.uri.value = ''
            }
          }}
        >
          <input
            aria-label="uri"
            required
            type="text"
            placeholder="Input a topic to subscribe"
            name="uri"
          />
          <input type="submit" value="Add topic"/>
        </form>
      )}
    </div>
  )
}

TopicURI.propTypes = {
  topic: PropTypes.string,
  subscribe: PropTypes.func.isRequired,
  removeTopic: PropTypes.func.isRequired
}

TopicURI.defaultProps = {
  topic: undefined
}

export default TopicURI
