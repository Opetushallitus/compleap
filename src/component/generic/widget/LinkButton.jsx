import React from 'react'
import PropTypes from 'prop-types'
import Button, { ButtonTypes } from 'component/generic/widget/Button'
import { transition } from 'router/router'

const LinkButton = ({ href, children, type, ...attributes }) => (
  <Button as='a' type={type} href={href} onClick={transition} {...attributes}>
    {children}
  </Button>
)

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  children: PropTypes.string,
  type: PropTypes.oneOf(ButtonTypes)
}

export default LinkButton
