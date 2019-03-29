import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { bordered } from 'ui/properties'

const HORIZONTAL_WHITESPACE = 1

const ExpanderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
`

const Header = styled.button`
  ${bordered};
  
  padding: ${0.5 * HORIZONTAL_WHITESPACE}rem;
  text-align: left;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.base};
  background-color: ${({ theme }) => theme.color.primary};
  border-color: ${({ theme }) => theme.color.primary};
  
  &:focus {
    outline: none;
  }
`

const Content = styled.div`
  ${bordered};
  padding: ${HORIZONTAL_WHITESPACE}rem 1rem;
`

const Expander = ({ header, children }) => {
  const [ isOpen, setIsOpen ] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <ExpanderContainer>
      <Header aria-expanded={isOpen} onClick={toggleOpen}>{header}</Header>
      {isOpen && <Content>{children}</Content>}
    </ExpanderContainer>
  )
}

const nodesType = PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired
Expander.propTypes = {
  header: nodesType,
  children: nodesType
}

export default Expander
