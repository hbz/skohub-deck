/** @jsx jsx */
import { css } from '@emotion/core'

export const colors = {
  secondary: '#222428',
  connection: '#34e011',
  text: 'hsl(0, 0%, 24%)',
  base: 'hsl(204, 24%, 96%)',
  blockBase: 'hsl(0, 100%, 100%)',
  primary: 'hsl(0, 0%, 24%)',
  inputBase: 'hsl(204, 24%, 96%)',
  inputAction: 'hsl(192, 8.2%, 88%)',
  accent: 'hsl(161.6, 71.8%, 41.8%)',
  error: 'tomato',
  success: 'hsl(159, 100%, 66%)'
}

export const padding = css`
  padding: 10px;
`
export const radius = css`
  border-radius: 2px;
`

export const buttonStyle = css`
  padding: 0;
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
