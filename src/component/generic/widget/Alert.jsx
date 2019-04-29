import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { children } from 'util/proptype'

export const AlertLevel = ['warn', 'error']

const IconSection = styled.div`
  width: 3rem;
  display: flex;
  margin: 1rem 1rem 1rem 0;
`

const ExclamationMarkContainer = styled.div`
  background-color: ${({ theme, level }) => level === 'error' ? theme.color.negative : theme.color.primary};
  color: ${({ theme, level }) => level === 'error' ? theme.color.white : theme.color.black};
  width: 2rem;
  height: 2rem;
  line-height: 2rem;
  border-radius: 50%;
  margin: auto;
  text-align: center;
`

const DisclaimerBox = styled.div`
  display: flex;
  background-color: ${({ theme, level }) => level === 'error' ? theme.color.negativeLightest : theme.color.primaryLightest};
  border: solid 1px ${({ theme, level }) => level === 'error' ? theme.color.negative : theme.color.primary};
  padding: 0 1rem;
`

const Alert = ({ children, level = 'warn' }) => (
  <DisclaimerBox level={level}>
    <IconSection>
      <ExclamationMarkContainer level={level}>{'!'}</ExclamationMarkContainer>
    </IconSection>
    {children}
  </DisclaimerBox>
)

Alert.propTypes = {
  children,
  level: PropTypes.oneOf(AlertLevel)
}

export default Alert
