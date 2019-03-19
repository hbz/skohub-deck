/** @jsx jsx */
import PropTypes from 'prop-types'
import { css, jsx } from '@emotion/core'
import { colors as c, padding, radius } from '../styles/variables'

import { X } from 'react-feather'

const style = css`
  flex: 0 0 100%;
  max-width: 250px;
  margin: 10px;
  border: 1px solid ${c.secondary};
  ${radius}

  .columnHeader {
    color: ${c.base};
    background-color: ${c.secondary};
    ${padding}
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`

const Column = ({ url, removeURL }) => {
  return (
    <div css={style} className="Column">
      <div className="columnHeader">
        {url} <X onClick={() => {
          removeURL(url)
        }} />
      </div>
    </div>
  )
}

Column.propTypes = {
  url: PropTypes.string.isRequired,
  removeURL: PropTypes.func.isRequired
}

export default Column
