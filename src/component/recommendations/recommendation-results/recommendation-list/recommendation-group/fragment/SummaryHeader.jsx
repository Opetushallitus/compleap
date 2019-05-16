import React from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'component/generic/hook/useTranslation'

const SummaryHeader = ({ degreeTitle, name, educationDegreeName, numApplicationOptions }) => {
  const t = useTranslation()
  const title = (
    degreeTitle +
    ` (${name}, ${t(educationDegreeName.toLowerCase())}) ` +
    numApplicationOptions + ' ' +
    t`hakukohdetta`
  )
  return <div>{title}</div>
}

SummaryHeader.propTypes = {
  degreeTitle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  educationDegreeName: PropTypes.string.isRequired,
  numApplicationOptions: PropTypes.number.isRequired
}

export default SummaryHeader
