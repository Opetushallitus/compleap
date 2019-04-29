import React from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'component/generic/hook/useTranslation'

const SummaryHeader = ({ field, education, numApplicationOptions }) => {
  const t = useTranslation()
  const title = `${field} (${education}) ${numApplicationOptions} ${t`hakukohdetta`}`
  return <div>{title}</div>
}

SummaryHeader.propTypes = {
  field: PropTypes.string.isRequired,
  education: PropTypes.string.isRequired,
  numApplicationOptions: PropTypes.number.isRequired
}

export default SummaryHeader
