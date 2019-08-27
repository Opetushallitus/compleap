import styled from 'styled-components'

export const H1 = styled.h1`
  font-size: ${props => props.theme.font.size.xl};
  font-weight: 500;
  margin: 0 0 2rem 0;
`

export const H2 = styled.h2`
  font-size: ${props => props.theme.font.size.l};
  line-height: 1.4em;
  font-weight: 300;
  margin: 0 0 1rem 0;
`

export const H3 = styled.h3`
  font-size: ${props => props.theme.font.size.m};
  font-weight: 500;
  margin: 0 0 0.5rem 0;
`

export const H4 = styled.h4`
  font-size: ${props => props.theme.font.size.base};
  font-weight: 500;
  margin: 0;
`
