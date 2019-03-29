import React from 'react'
import PropTypes from 'prop-types'
import Expander from 'component/generic/widget/Expander'
import SummaryHeader from './fragment/SummaryHeader'
import Brief from './fragment/Brief'
import Description from './fragment/Description'
import Jobs from './fragment/Jobs'
import CertificateDisclaimer from './fragment/CertificateDisclaimer'

// TODO Replace hard-coded content with recommendation data
// TODO Handle translations for recommendation

const Recommendation = ({ recommendationData }) => {
  const Header = (
    <SummaryHeader
      field='Autokorinkorjaaja'
      education='Ammatillinen tutkinto'
      credits={180}
      creditUnit='osp'
      numApplicationOptions={96}
    />
  )

  return (
    <Expander header={Header}>
      <Brief/>
      <Description/>
      <Jobs jobs={['autoliikkeet', 'autokorinkorjaamot', 'pienet laaja-alaiset yleiskorjaamot', 'oma yritys']}/>
      <CertificateDisclaimer/>
    </Expander>
  )
}

Recommendation.propTypes = {
  recommendationData: PropTypes.object.isRequired
}

export default Recommendation
