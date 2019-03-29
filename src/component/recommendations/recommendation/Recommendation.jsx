import React from 'react'
import PropTypes from 'prop-types'
import t from 'util/translate'
import { RecommendationsState } from 'state/recommendationStates'
import RecommendationsPlaceholder from 'component/recommendations/RecommendationsPlaceholder'
import Expander from 'component/generic/widget/Expander'
import Disclaimer from 'component/generic/widget/Disclaimer'

// TODO Handle translations for recommendations

const SummaryHeader = ({ field, education, credits, creditUnit, numApplicationOptions }) => {
  const title = `${field} (${education}, ${credits} ${creditUnit}) ${numApplicationOptions} ${t`hakukohdetta`}`
  return <div>{title}</div>
}

SummaryHeader.propTypes = {
  field: PropTypes.string.isRequired,
  education: PropTypes.string.isRequired,
  credits: PropTypes.number.isRequired,
  creditUnit: PropTypes.string.isRequired,
  numApplicationOptions: PropTypes.number.isRequired
}

const Recommendation = ({ recommendations, status }) => {
  if (status === RecommendationsState.pending) return <RecommendationsPlaceholder loading={true}/> // TODO replace with actual loading indicator

  const Header = (
    <SummaryHeader
      field='Autokorinkorjaaja'
      education='Ammatillinen tutkinto'
      credits={180}
      creditUnit='osp'
      numApplicationOptions={96}
    />
  )

  const Brief = () =>
    <p><b>{'Autokorinkorjaaja on tutkintonimikkeenä autokorinkorjaajan osaamisalassa, joka liittyy tutkintoon: Autoalan perustutkinto'}</b></p>

  const Description = () => (
    <p>
      {'Autokorinkorjauksen osaamisalan suorittanut tietää autokorin rakenteeseen ja materiaaleihin liittyvät asiat sekä osaa erilaisia lämpökäsittelymenetelmiä. ' +
      'Hän joutuu autoa korjattavaksi purkaessaan sekä korjauksen jälkeen kootessaan käsittelemään auton muuta tekniikkaa, kuten esim. mekaanisia osia ja elektroniikkaa. ' +
      'Näistä työvaiheista selvitäkseen hänellä on asennusteknisiä taitoja. Hän osaa käyttää erilaisia korinkorjausmenetelmiä sekä tuntee auton pintakäsittelyyn liittyvät asiat. ' +
      'Autokorinkorjaaja tuntee auton yleisimmät alusta-, moottori- ja sähkölaiterakenteet. Hän selviytyy ammatissa tarvittavista hitsauksista, liitoksista, ohutlevytöistä ja metallien liimauksista. ' +
      'Hän tunnistaa korirakenteiden materiaalit ja osaa niiden edellyttämät korjaukset. ' +
      'Hän osaa tehdä pintaosien oikaisutyöt, korinosien oikaisun, vaihdon ja sovituksen sekä lasien vaihdon ja tuntee korinsähkötekniikan perusteet.'}
    </p>
  )

  const Jobs = ({ jobs }) => (
    jobs && jobs.length > 0 && (
      <p>
        {t`Työpaikat` + ': ' + jobs.join(', ') + '.'}
      </p>
    )
  )

  Jobs.propTypes = {
    jobs: PropTypes.array
  }

  const CertificateDisclaimer = () =>
    <Disclaimer>
      <p>{t`Huomaa, että sinun on pyydettäessä pystyttävä näyttämään todistukset aikaisemmista opinnoistasi. Tällä tavoin varmistetaan, että pystyt oikeasti hakemaan haluamaasi koulutukseen.`}</p>
    </Disclaimer>

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
  recommendations: PropTypes.any,
  status: PropTypes.oneOf(Object.values(RecommendationsState))
}

export default Recommendation
