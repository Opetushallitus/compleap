import React from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'component/generic/hook/useTranslation'

const SummaryHeader = ({ degreeTitle, name, education, numApplicationOptions }) => {
  const t = useTranslation()
  const title = (
    degreeTitle +
    ` (${name}, ${t(education)}) ` +
    numApplicationOptions + ' ' +
    t`hakukohdetta`
  )
  return <div>{title}</div>
}

SummaryHeader.propTypes = {
  degreeTitle: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  education: PropTypes.string.isRequired,
  numApplicationOptions: PropTypes.number.isRequired
}

export default SummaryHeader
