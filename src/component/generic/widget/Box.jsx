import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { children } from 'util/proptype'

const AlignType = ['left', 'right', 'center']

const alignToFlex = align => {
  switch (align) {
    case 'right': return 'flex-end'
    case 'center': return 'center'
    case 'left':
    default:
      return 'flex-start'
  }
}

const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.maxContentWidth}
  margin: auto;
  padding: 2rem 1rem;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: column;
  text-align: ${({ align }) => align};
  align-items: ${({ align }) => alignToFlex(align)};
`

const Box = ({ children, className, align = 'left' }) => (
  <Container
    className={className}
    align={align}
  >
    {children}
  </Container>
)

Box.propTypes = {
  children,
  className: PropTypes.string,
  align: PropTypes.oneOf(AlignType)
}

export default Box
