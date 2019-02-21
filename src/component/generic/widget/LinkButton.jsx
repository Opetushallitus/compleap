import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { SolidButtonStyle } from 'component/generic/widget/Button'
import { transition } from 'router/router'

const LinkButtonStyle = styled(SolidButtonStyle)`
  text-decoration: none;
`

const LinkButton = ({ href, attributes = {}, children }) => (
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
