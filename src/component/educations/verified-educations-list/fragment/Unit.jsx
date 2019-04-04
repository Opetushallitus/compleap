import React from 'react'
import styled from 'styled-components'
import { children } from 'util/proptype'

const Container = styled.div`
  display: flex;
  margin: 1rem 0;
`

const Unit = ({ children }) => <Container>{children}</Container>

Unit.propTypes = {
  children
}

export default Unit
