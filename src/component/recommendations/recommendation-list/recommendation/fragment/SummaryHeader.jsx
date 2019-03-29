import React from 'react'
import PropTypes from 'prop-types'
import t from 'util/translate'

const SummaryHeader = ({ field, education, credits, creditUnit, numApplicationOptions }) => {
  const title = `${field} (${education}, ${credits} ${creditUnit}) ${numApplicationOptions} ${t`hakukohdetta`}`
  return <div>{title}</div>
}

SummaryHeader.propTypes = {
  field: PropTypes.string.isRequired,
  education: PropTypes.string.isRequired,
  credits: PropTypes.number.isRequired,
  creditUnit: PropTypes.string.isRequired,
  numApplicationOptions: PropTypes.number.isRequired
}

export default SummaryHeader
