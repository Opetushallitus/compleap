import styled from 'styled-components'
import { rounded } from 'ui/properties'

const CompetenceTag = styled.div`
  ${rounded};

  position: relative;
  display: inline-block;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme, disabled }) => disabled ? 'transparent' : theme.color.accentLighter};
  background-color: ${({ theme, disabled }) => disabled ? theme.color.grayLightest : theme.color.white};
  box-shadow: ${({ theme, disabled }) => disabled ? 'none' : `0 5px 10px 2px ${theme.color.grayLightest}`};
  height: 1rem;
  line-height: 1rem;
  padding: 0.3rem 1rem;
  vertical-align: bottom;
  transition: border-color 0.1s, background-color 0.1s;

  &:focus {
    outline: 0;
  }

  &:hover {
    border-color: ${({ theme, disabled }) => disabled ? 'transparent' : theme.color.accent};
    background-color: ${({ theme, disabled }) => disabled ? theme.color.white : theme.color.accentLightest};
  }
`

export default CompetenceTag
