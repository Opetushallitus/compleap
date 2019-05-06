import React from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'component/generic/hook/useTranslation'
import Expander from 'component/generic/widget/Expander'
import SummaryHeader from './fragment/SummaryHeader'
import Brief from './fragment/Brief'
import Description from './fragment/Description'
import CertificateDisclaimer from './fragment/CertificateDisclaimer'
import ApplicationOptionList from './application-option-list/ApplicationOptionList'

const RecommendationGroup = ({ title, recommendations }) => {
  const t = useTranslation()

  const Header = (
    <SummaryHeader
      numApplicationOptions={recommendations.length}
      field={title}
      education={t`Ammatillinen tutkinto`} // TODO Replace hard-coded type with data from API when supporting multiple types
    />
  )

  return (
    <Expander header={Header}>
      <Brief/>
      <Description/>
      <CertificateDisclaimer/>
      <ApplicationOptionList options={recommendations}/>
    </Expander>
  )
}

RecommendationGroup.propTypes = {
  title: PropTypes.string.isRequired,
  recommendations: PropTypes.array.isRequired
}

export default RecommendationGroup
