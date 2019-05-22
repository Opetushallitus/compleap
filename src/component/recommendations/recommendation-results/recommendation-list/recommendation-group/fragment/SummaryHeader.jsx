import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useTranslation from 'component/generic/hook/useTranslation'

const SummaryRow = styled.div`
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`

const SummaryHeader = ({ name, degreeTitles, educationCode, numApplicationOptions }) => {
  const t = useTranslation()
  return (
    <summary>
      <SummaryRow><b>{degreeTitles.join(', ')}</b></SummaryRow>
      <SummaryRow><i>{`${name}: ${educationCode}`}</i></SummaryRow>
      <SummaryRow>{`${numApplicationOptions} ${t`hakukohdetta`}`}</SummaryRow>
    </summary>
  )
}

SummaryHeader.propTypes = {
  name: PropTypes.string.isRequired,
  degreeTitles: PropTypes.array.isRequired,
  educationCode: PropTypes.string.isRequired,
  numApplicationOptions: PropTypes.number.isRequired
}

export default SummaryHeader
