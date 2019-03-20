import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  disabled,
  fadeColor,
  primary,
  primaryDarker, rounded,
  roundedRectangle,
  secondary,
  secondaryDarker
} from 'ui/properties'

const ButtonFocusBorderWidth = '3px'

const ButtonTypes = ['primary', 'secondary', 'text']
const resolveButtonStyle = type => {
  switch (type) {
    case 'primary': return PrimaryButtonStyle
    case 'text': return TextButtonStyle
    default: return SecondaryButtonStyle
  }
}

const BaseButtonStyle = styled.button`
  display: inline-block;
  border: none;
  padding: 0.6rem 2rem;
  font-size: ${props => props.theme.font.size.base};
  cursor: pointer;
  text-align: center;
  font-weight: 400;
  margin: ${ButtonFocusBorderWidth};

  ${fadeColor}

  &:disabled {
    ${disabled}
  }

  &:focus {
    outline: 0;
    margin: 0;
  }

`

export const PrimaryButtonStyle = styled(BaseButtonStyle)`
  ${primary}
  ${roundedRectangle}

  &:hover:enabled {
    ${primaryDarker}
  }

  &:focus {
    border: solid ${ButtonFocusBorderWidth} ${({ theme }) => theme.color.primaryDarkest};
  }
`

export const SecondaryButtonStyle = styled(BaseButtonStyle)`
  ${secondary}
  ${rounded}

  &:hover:enabled {
    ${secondaryDarker}
  }

  &:focus {
    border: solid ${ButtonFocusBorderWidth} ${({ theme }) => theme.color.secondaryLightest};
  }
`

export const TextButtonStyle = styled(BaseButtonStyle)`
  text-decoration: underline;

  ${roundedRectangle}

  &:hover:enabled {
    background-color: ${({ theme }) => theme.color.grayLightest};
  }

  &:focus {
    border: solid ${ButtonFocusBorderWidth} ${({ theme }) => theme.color.grayLighter};
  }
`

const Button = ({ onClick, type = 'primary', children, ...attributes }) => {
  const Component = resolveButtonStyle(type)

  return (
    <Component onClick={onClick} {...attributes}>
      {children}
    </Component>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  type: PropTypes.oneOf(ButtonTypes),
  attributes: PropTypes.object,
  children: PropTypes.string
}

export default Button
