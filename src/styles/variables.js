/** @jsx jsx */
import { css } from '@emotion/core'

export const colors = {
  primary: '#ff575d',
  secondary: '#222428',
  base: '#eff0f2',
  accent: '#55555a',
  text: '#fbfbff',
  connection: '#3eef19'
}

export const padding = css`
  padding: 10px;
`
export const radius = css`
  border-radius: 2px;
`

export const buttonStyle = css`
  padding: 0,
  border: 0;
  border: 0;
  ${padding};
  color: ${colors.base};
  background-color: ${colors.accent};
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: ${colors.secondary};
  }
`
