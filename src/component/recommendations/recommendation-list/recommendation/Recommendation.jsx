import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Expander from 'component/generic/widget/Expander'
import SummaryHeader from './fragment/SummaryHeader'
import Brief from './fragment/Brief'
import Description from './fragment/Description'
import Jobs from './fragment/Jobs'
import CertificateDisclaimer from './fragment/CertificateDisclaimer'
import ApplicationOption from 'component/recommendations/recommendation-list/recommendation/fragment/ApplicationOption'

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

const ApplicationOptionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const ApplicationOptionListItem = styled.li`
  margin: 0.5rem 0;
`

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

      <ApplicationOptionList>
        {applicationOptions.map(({ id, organization, applicationStatus, readMoreLink }) => (
          <ApplicationOptionListItem key={id}>
            <ApplicationOption organization={organization} applicationStatus={applicationStatus} readMoreLink={readMoreLink}/>
          </ApplicationOptionListItem>
        ))}
      </ApplicationOptionList>

    </Expander>
  )
}

Recommendation.propTypes = {
  recommendationData: PropTypes.object.isRequired
}

export default Recommendation
