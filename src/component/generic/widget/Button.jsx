import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  disabled,
  fadeColor, padded,
  primary,
  primaryDarker, rounded,
  roundedRectangle,
  secondary,
  secondaryDarker
} from 'ui/properties'

const ButtonFocusBorderWidth = '3px'

export const ButtonTypes = ['primary', 'secondary', 'text', 'empty']
const resolveButtonStyle = type => {
  switch (type) {
    case 'primary': return PrimaryButtonStyle
    case 'text': return TextButtonStyle
    case 'empty': return EmptyButtonStyle
    default: return SecondaryButtonStyle
  }
}

const BaseButtonStyle = styled.button`
  display: inline-block;
  border: none;
  font-size: ${props => props.theme.font.size.base};
  cursor: pointer;
  text-align: center;
  font-weight: 400;
  text-decoration: none;
  margin: ${ButtonFocusBorderWidth};

  ${fadeColor};

  &:disabled {
    ${disabled};
    cursor: default;
  }

  &:focus {
    outline: 0;
    margin: 0;
  }

`

const PrimaryButtonStyle = styled(BaseButtonStyle)`
  ${primary};
  ${roundedRectangle};
  ${padded};

  &:hover:enabled {
    ${primaryDarker};
  }

  &:focus {
    border: solid ${ButtonFocusBorderWidth} ${({ theme }) => theme.color.primaryDarkest};
  }
`

const SecondaryButtonStyle = styled(BaseButtonStyle)`
  ${secondary};
  ${rounded};

  &:hover:enabled {
    ${secondaryDarker};
  }

  &:focus {
    border: solid ${ButtonFocusBorderWidth} ${({ theme }) => theme.color.secondaryLightest};
  }
`

const TextButtonStyle = styled(BaseButtonStyle)`
  text-decoration: underline;
  color: ${({ theme }) => theme.color.black};
  background: none;

  ${roundedRectangle};
  ${padded};

  &:hover:enabled {
    background-color: ${({ theme }) => theme.color.grayLightest};
  }

  &:focus {
    border: solid ${ButtonFocusBorderWidth} ${({ theme }) => theme.color.grayLighter};
  }
`

const EmptyButtonStyle = styled.button`
  background: none;
  border: none;
  margin: 0;
  padding: 0;
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
