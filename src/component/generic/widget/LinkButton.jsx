import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { PrimaryButtonStyle } from 'component/generic/widget/Button'
import { transition } from 'router/router'

const LinkButtonStyle = styled(PrimaryButtonStyle)`
  text-decoration: none;
`

const LinkButton = ({ href, children, ...attributes }) => (
  <LinkButtonStyle as='a' href={href} onClick={transition} {...attributes}>
    {children}
  </LinkButtonStyle>
)

LinkButton.propTypes = {
  href: PropTypes.string.isRequired,
  attributes: PropTypes.object,
  children: PropTypes.string
}

export default LinkButton
