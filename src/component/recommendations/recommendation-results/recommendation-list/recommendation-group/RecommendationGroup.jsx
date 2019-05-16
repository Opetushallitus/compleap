import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import Expander from 'component/generic/widget/Expander'
import SummaryHeader from './fragment/SummaryHeader'
import Brief from './fragment/Brief'
import Description from './fragment/Description'
import CertificateDisclaimer from './fragment/CertificateDisclaimer'
import ApplicationOptionList from './application-option-list/ApplicationOptionList'

const RecommendationGroup = ({ recommendations }) => {
  const degreeTitles = R.compose(R.sort((a, b) => a.localeCompare(b)), R.uniq, R.map(({ degreeTitle }) => degreeTitle))(recommendations)
  const head = recommendations[0]
  const { name, educationCode, educationDegreeName, goals } = head

  const Header = (
    <SummaryHeader
      degreeTitles={degreeTitles}
      name={name}
      educationDegreeName={educationDegreeName}
      numApplicationOptions={recommendations.length}
    />
  )

  return (
    <Expander header={Header}>
      <Brief
        name={name}
        degreeTitles={degreeTitles}
        educationCode={educationCode}
      />
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
