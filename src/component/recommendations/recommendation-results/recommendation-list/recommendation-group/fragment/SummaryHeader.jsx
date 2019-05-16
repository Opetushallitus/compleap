import React from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'component/generic/hook/useTranslation'

const SummaryHeader = ({ degreeTitles, name, educationDegreeName, numApplicationOptions }) => {
  const t = useTranslation()
  const title = (
    degreeTitles.join(', ') +
    ` (${name}, ${t(educationDegreeName.toLowerCase())}) ` +
    numApplicationOptions + ' ' +
    t`hakukohdetta`
  )
  return <div>{title}</div>
}

SummaryHeader.propTypes = {
  degreeTitles: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  educationDegreeName: PropTypes.string.isRequired,
  numApplicationOptions: PropTypes.number.isRequired
}

export default SummaryHeader
