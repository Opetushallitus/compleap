import React, { useState } from 'react'
import styled from 'styled-components'
import { children } from 'util/proptype'

const HORIZONTAL_WHITESPACE = 1

const ExpanderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  box-shadow: 0 2px 5px 1px ${({ theme }) => theme.color.grayLighter};
`

const Header = styled.button`
  border: none;
  padding: 1rem ${0.5 * HORIZONTAL_WHITESPACE}rem;
  text-align: left;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.base};
  background-color: ${({ theme }) => theme.color.primary};
  
  &:focus {
    outline: none;
  }
`

const Content = styled.div`
  padding: ${HORIZONTAL_WHITESPACE}rem 1rem;
  background-color: ${({ theme }) => theme.color.white};
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

Expander.propTypes = {
  header: children,
  children
}

export default Expander
