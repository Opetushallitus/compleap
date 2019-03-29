import React from 'react'
import PropTypes from 'prop-types'
import Expander from 'component/generic/widget/Expander'
import SummaryHeader from './fragment/SummaryHeader'
import Brief from './fragment/Brief'
import Description from './fragment/Description'
import Jobs from './fragment/Jobs'
import CertificateDisclaimer from './fragment/CertificateDisclaimer'
import ApplicationOptionList from 'component/recommendations/recommendation-list/recommendation/fragment/ApplicationOptionList'

// TODO Replace hard-coded content with recommendation data
// TODO Handle translations for recommendation

const applicationOptions = [
  {
    id: '1',
    organization: 'Stadin ammattiopisto, Ilkantien toimipaikka, Helsinki',
    applicationStatus: 'Haku käynnissä',
    readMoreLink: '#profile'
  },
  {
    id: '2',
    organization: 'Omnia, Espoo',
    applicationStatus: 'Haku käynnissä',
    readMoreLink: '#profile'
  },
  {
    id: '3',
    organization: 'Ammattiopisto Live, Metsälän toimipaikka, Helsinki',
    applicationStatus: 'Hakuaika 14.3. - 15.4. 2019',
    readMoreLink: '#profile'
  }
]

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
      <ApplicationOptionList options={applicationOptions}/>
    </Expander>
  )
}

Recommendation.propTypes = {
  recommendationData: PropTypes.object.isRequired
}

export default Recommendation
