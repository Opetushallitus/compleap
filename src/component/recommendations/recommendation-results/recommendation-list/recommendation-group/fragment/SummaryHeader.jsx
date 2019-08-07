import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useTranslation from 'component/generic/hook/useTranslation'

const SummaryRow = styled.div`
  &:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`

const SummaryHeader = ({ name, degreeTitles, educationCode, numApplicationOptions, type }) => {
  const t = useTranslation()

  const title = type === 'KORKEAKOULU' ? name : degreeTitles.join(', ')
  const description = type === 'KORKEAKOULU' ? degreeTitles.join(', ') : `${name}: ${educationCode}`

  return (
    <summary>
      <SummaryRow><b>{title}</b></SummaryRow>
      <SummaryRow><i>{description}</i></SummaryRow>
      <SummaryRow>{`${numApplicationOptions} ${t`hakukohdetta`}`}</SummaryRow>
    </summary>
  )
}

SummaryHeader.propTypes = {
  name: PropTypes.string.isRequired,
  degreeTitles: PropTypes.array.isRequired,
  educationCode: PropTypes.string.isRequired,
  numApplicationOptions: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired
}

export default SummaryHeader
