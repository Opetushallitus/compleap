import { createGlobalStyle } from 'styled-components'
import media from 'ui/media'

const GlobalStyle = createGlobalStyle`
  body, button, input, optgroup, select, textarea {
    font-family: ${({ theme }) => theme.font.family};
  }

  body {
    margin: 0;

    &#Profile {
      background-color: ${({ theme }) => theme.color.background};
    }
  }
  
  html {
    font-size: ${props => props.theme.font.size.baseCompact};

    ${media.full`
      font-size: ${({ theme }) => theme.font.size.base};
    `}
  }
`

export default GlobalStyle
