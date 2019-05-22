import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import Expander from 'component/generic/widget/Expander'
import SummaryHeader from './fragment/SummaryHeader'
import Description from './fragment/Description'
import CertificateDisclaimer from './fragment/CertificateDisclaimer'
import ApplicationOptionList from './application-option-list/ApplicationOptionList'

const RecommendationGroup = ({ recommendations }) => {
  const degreeTitles = R.compose(R.sort((a, b) => a.localeCompare(b)), R.uniq, R.map(({ degreeTitle }) => degreeTitle))(recommendations)
  const head = recommendations[0]
  const { name, educationCode, goals } = head

  const Header = (
    <SummaryHeader
      name={name}
      degreeTitles={degreeTitles}
      educationCode={educationCode}
      numApplicationOptions={recommendations.length}
    />
  )

  return (
    <Expander header={Header}>
      <Description text={goals}/>
      <CertificateDisclaimer/>
      <ApplicationOptionList options={recommendations}/>
    </Expander>
  )
}

RecommendationGroup.propTypes = {
  recommendations: PropTypes.array.isRequired
}

export default RecommendationGroup
