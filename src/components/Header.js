/** @jsx jsx */
import PropTypes from 'prop-types'

import { css, jsx } from '@emotion/core'
import { padding } from '../styles/variables'
import { colors as c } from '../styles/variables'


const style = css`
  background: #11998e;
  background: linear-gradient(to right, #27CA84, #11998e);

  h1 {
    margin: 0;
    display: inline-block;

    a {
      color: white;
    }
  }

  .wave {
    overflow: hidden;
    position: relative;
    height: 50px;
  }

  .headerContent {
    padding: 20px 20px 5px 20px;
    display: flex;
    align-items: center;
  }

  .wave svg {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    fill: ${c.base};
  }
`

const Header = ({ children }) => {
  return (
    <header
      css={style}
      className="Header"
    >
      <div className="headerContent">
        <h1>
          <a href="/">
            SkoHub-Deck
          </a>

        </h1>

        {children}

      </div>

      <div className="wave">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1000 279.24"
          preserveAspectRatio="none">
            <path
              d="M1000 0S331.54-4.18 0 279.24h1000z"
              opacity=".25"
            />
            <path
              d="M1000 279.24s-339.56-44.3-522.95-109.6S132.86 23.76 0 25.15v254.09z"
            />
          </svg>
      </div>

    </header>
  )
}

Header.propTypes = {
  children: PropTypes.node.isRequired
}

export default Header
