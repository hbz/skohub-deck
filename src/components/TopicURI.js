/** @jsx jsx */
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { Radio } from 'react-feather'

import { colors as c, padding, buttonStyle } from '../styles/variables'

const style = css`
  background-color: ${c.primary};
  padding: 10px 20px;
  border-top: 1px solid ${c.base};

  h3 {
    margin: 0;
    display: flex;
    color: ${c.base};
  }

  form {
    display: flex;

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

const TopicURI = ({ addTopic, topic }) => {
  return (
    <div css={style} className="TopicURI">
      {topic ? (
        <h3><Radio />&nbsp;Using the topic: {topic}</h3>
      ) : (
        <form
          onSubmit={e => {
            e.preventDefault()

            const uri = e.target.uri.value
            if (uri) {
              addTopic(uri)
              e.target.uri.value = ''
            }
          }}
        >
          <input required type="text" placeholder="Input a topic to subscribe" name="uri"/>
          <input type="submit" value="Add topic"/>
        </form>
      )}
    </div>
  )
}

TopicURI.propTypes = {
  topic: PropTypes.string,
  addTopic: PropTypes.func.isRequired
}

TopicURI.defaultProps = {
  topic: undefined
}

export default TopicURI
