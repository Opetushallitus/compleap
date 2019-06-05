import React from 'react'
import PropTypes from 'prop-types'
import DOMPurify from 'dompurify'

const HtmlToText = ({ html }) => {
  const sanitized = DOMPurify.sanitize(html)
  return <div dangerouslySetInnerHTML={{ __html: sanitized }}/>
}

HtmlToText.propTypes = {
  html: PropTypes.string.isRequired
}

const Description = ({ text }) => <HtmlToText html={text}/>

Description.propTypes = {
  text: PropTypes.string.isRequired
}

export default Description
