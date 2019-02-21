import { createGlobalStyle } from 'styled-components'
import media from 'ui/media'

const GlobalStyle = createGlobalStyle`
  body, button, input, optgroup, select, textarea {
    font-family: ${props => props.theme.font.family};
  }
  
  html {
    font-size: ${props => props.theme.font.size.baseCompact};
    
    ${media.full`
      font-size: ${props => props.theme.font.size.base};
    `}
  }
`

export default GlobalStyle
