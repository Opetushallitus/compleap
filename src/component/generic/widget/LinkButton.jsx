import React from 'react'
import PropTypes from 'prop-types'
import Button, { ButtonTypes } from 'component/generic/widget/Button'
import { transition } from 'router/router'

const LinkButton = ({ href, disabled, children, type, onClick, ...attributes }) => (
  <Button
    as='a'
    type={type}
    href={disabled ? undefined : href}
    disabled={disabled}
    onClick={disabled ? () => {} : onClick || transition} {...attributes}
  >
    {children}
  </Button>
)

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  attributes: PropTypes.object,
  children: PropTypes.node,
  type: PropTypes.oneOf(ButtonTypes),
  onClick: PropTypes.func
}

export default LinkButton
