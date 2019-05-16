import React from 'react'
import PropTypes from 'prop-types'
import Expander from 'component/generic/widget/Expander'
import SummaryHeader from './fragment/SummaryHeader'
import Brief from './fragment/Brief'
import Description from './fragment/Description'
import CertificateDisclaimer from './fragment/CertificateDisclaimer'
import ApplicationOptionList from './application-option-list/ApplicationOptionList'

const RecommendationGroup = ({ recommendations }) => {
  const head = recommendations[0]
  const { name, degreeTitle, educationCode, educationDegreeName } = head

  const Header = (
    <SummaryHeader
      degreeTitle={degreeTitle}
      name={name}
      education={educationDegreeName}
      numApplicationOptions={recommendations.length}
    />
  )

  return (
    <Expander header={Header}>
      <Brief
        name={name}
        degreeTitle={degreeTitle}
        educationCode={educationCode}
      />
      <Description/>
      <CertificateDisclaimer/>
      <ApplicationOptionList options={recommendations}/>
    </Expander>
  )
}

RecommendationGroup.propTypes = {
  recommendations: PropTypes.array.isRequired
}

export default RecommendationGroup
