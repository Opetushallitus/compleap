import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const AlignType = ['left', 'right', 'center']

const Container = styled.div`
  max-width: ${({ theme }) => theme.layout.maxContentWidth}
  margin: auto;
  padding: 2rem 1rem;
  text-align: ${({ textAlign }) => textAlign};
`

const Box = ({ children, align = 'left' }) => <Container textAlign={align}>{children}</Container>

Box.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  align: PropTypes.oneOf(AlignType)
}

export default Box
