import { css } from 'styled-components'

const full = (...declarations) => css`
  @media (min-width: ${props => props.theme.layout.breakpointFull}) {
    ${css(...declarations)}
  }
`

export default {
  full
}
