/** @jsx jsx */
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { Radio, X } from 'react-feather'

import { colors as c, padding, buttonStyle } from '../styles/variables'

const style = css`
  padding-bottom: 20px;

  button.inputStyle svg {
    padding: 2px;
    position: relative;
    top: 2px;
  }

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
      ${padding};
    }

    input[type=submit] {
      margin-left: 10px;
    }
  }
`

const TopicURI = ({ subscribe, topic, removeTopic }) => {
  return (
    <div css={css`
      ${style};
    `} className="TopicURI">
      {topic ? (
        <div className="title">
          <h3><Radio />&nbsp;Using the topic: {topic}</h3>
          <button
            className="inputStyle"
            onClick={removeTopic}
            title="Remove Topic"
          >
            <X/>
          </button>
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
            className="inputStyle"
            aria-label="uri"
            required
            type="text"
            placeholder="Input a topic to subscribe"
            name="uri"
          />
          <input
            type="submit"
            value="Add topic"
            className="inputStyle"
          />
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
