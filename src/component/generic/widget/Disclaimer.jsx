import React from 'react'
import styled from 'styled-components'
import { children } from 'util/proptype'

const IconSection = styled.div`
  width: 3rem;
  display: flex;
  margin: 1rem;
`

const ExclamationMarkContainer = styled.div`
  background-color: ${({ theme }) => theme.color.primary};
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  border-radius: 50%;
  margin: auto;
  text-align: center;
`

const DisclaimerBox = styled.div`
  display: flex;
  background-color: ${({ theme }) => theme.color.primaryLightest};
  border: solid 1px ${({ theme }) => theme.color.primary};
`

const Disclaimer = ({ children }) => (
  <DisclaimerBox>
    <IconSection>
      <ExclamationMarkContainer>{'!'}</ExclamationMarkContainer>
    </IconSection>
    {children}
  </DisclaimerBox>
)

Disclaimer.propTypes = {
  children
}

export default Disclaimer
