import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import regions from 'resources/regions'
import { Context } from 'state/state'
import useTranslation from 'component/generic/hook/useTranslation'
import useObservable from 'component/generic/hook/useObservable'
import Expander from 'component/generic/widget/Expander'
import SummaryHeader from './fragment/SummaryHeader'
import Brief from './fragment/Brief'
import Description from './fragment/Description'
import CertificateDisclaimer from './fragment/CertificateDisclaimer'
import ApplicationOptionList from './application-option-list/ApplicationOptionList'

// Note: API operates on fixed Finnish language: filter regions by Finnish names
// TODO Consider refactoring to more robust, shared identifiers
const regionsByName = R.compose(R.map(R.head), R.invert, R.map(langs => langs['fi']))(regions)
const findRegionId = regionName => {
  const id = regionsByName[regionName]
  if (!id) {
    console.error(`Unmatched region: cannot find region id for region name ${regionName}`)
    return -1
  }
  return id
}

const RecommendationGroup = ({ title, recommendations }) => {
  const t = useTranslation()
  const context$ = useContext(Context)
  const locationIdWhitelist = useObservable(context$, { path: ['context', 'recommendations', 'options', 'locations'] })
  const optionsWithRegionIds = recommendations.map(option => R.assoc('regionId', findRegionId(option.providerProvince), option))
  const currentMatchingOptions = locationIdWhitelist.length > 0 ? optionsWithRegionIds.filter(option => locationIdWhitelist.includes(option.regionId)) : optionsWithRegionIds

  const Header = (
    <SummaryHeader
      numApplicationOptions={currentMatchingOptions.length}
      field={title}
      education={t`Ammatillinen tutkinto`} // TODO Replace hard-coded type with data from API when supporting multiple types
    />
  )

  return (
    <Expander header={Header}>
      <Brief/>
      <Description/>
      <CertificateDisclaimer/>
      <ApplicationOptionList options={currentMatchingOptions}/>
    </Expander>
  )
}

RecommendationGroup.propTypes = {
  title: PropTypes.string.isRequired,
  recommendations: PropTypes.array.isRequired
}

export default RecommendationGroup
