import styled from 'styled-components'
import { bordered, roundedRectangle } from 'ui/properties'

const TextInput = styled.input`
  ${roundedRectangle};
  ${bordered};
  font-size: ${({ theme }) => theme.font.size.base};
  
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 0.75rem;
  margin: 0;
  -webkit-appearance: none;
  
  &:focus {
    outline: none;
  }
`

export default TextInput
