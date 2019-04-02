/**
 * Based on https://loading.io/css/
 */

import React from 'react'
import styled, { keyframes } from 'styled-components'

const Container = styled.div`
  display: inline-block;
  position: relative;
  width: 3rem;
  height: 3rem;
`

const ring = keyframes`
  from {
    transform: rotate(0deg);
  }
  
  to {
    transform: rotate(360deg);
  }
`

const Partial = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: 2.5rem;
  height: 2.5rem;
  margin: 4px;
  border: 4px solid transparent;
  border-top-color: ${({ theme }) => theme.color.black};
  border-radius: 50%;
  animation: ${ring} 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  
  &:nth-child(1) {
    animation-delay: -0.45s;
  }
  &:nth-child(2) {
    animation-delay: -0.3s;
  }
  &:nth-child(3) {
    animation-delay: -0.15s;
  }
`

const Spinner = () => (
  <Container>
    <Partial/>
    <Partial/>
    <Partial/>
    <Partial/>
  </Container>
)

Spinner.propTypes = {}

export default Spinner
