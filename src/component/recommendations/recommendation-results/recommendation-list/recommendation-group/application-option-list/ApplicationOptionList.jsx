import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as R from 'ramda'
import regions from 'resources/regions'
import { Context } from 'state/state'
import useTranslation from 'component/generic/hook/useTranslation'
import useObservable from 'component/generic/hook/useObservable'
import ApplicationOptions from './fragment/ApplicationOptions'
import ShowMoreButton from './fragment/ShowMoreButton'

const TRUNCATED_LIST_LENGTH = 2

const NoResults = styled.div`
  background-color: ${({ theme }) => theme.color.negativeLightest};
  border: solid 1px ${({ theme }) => theme.color.negative};
  padding: 1rem;
  margin: 1rem 0;
`

const regionsByName = R.compose(R.map(R.head), R.invert, R.map(langs => langs['fi']))(regions) // TODO Note that API operates on fixed Finnish language
const findRegionId = regionName => {
  const id = regionsByName[regionName]
  if (!id) {
    console.error(`Unmatched region: cannot find region id for region name ${regionName}`)
    return -1
  }
  return id
}

const ApplicationOptionList = ({ options }) => {
  const [showAll, setShowAll] = useState(false)
  const t = useTranslation()
  const context$ = useContext(Context)
  const locationIdWhitelist = useObservable(context$, { path: ['context', 'recommendations', 'options', 'locations'] })
  const optionsWithRegionIds = options.map(option => R.assoc('regionId', findRegionId(option.providerProvince), option))
  const currentMatchingOptions = locationIdWhitelist.length > 0 ? optionsWithRegionIds.filter(option => locationIdWhitelist.includes(option.regionId)) : optionsWithRegionIds
  const optionsToShow = showAll ? currentMatchingOptions : R.take(TRUNCATED_LIST_LENGTH, currentMatchingOptions)

  return (
    <React.Fragment>
      <ApplicationOptions options={optionsToShow}/>

      {currentMatchingOptions.length === 0 && (
        <NoResults>{t`Ei hakukohteita nykyisillä rajauksilla`}</NoResults>
      )}

      {currentMatchingOptions.length > TRUNCATED_LIST_LENGTH && (
        <ShowMoreButton
          showAll={showAll}
          onClick={() => setShowAll(!showAll)}
          numRest={currentMatchingOptions.length - TRUNCATED_LIST_LENGTH}
        />
      )}
    </React.Fragment>
  )
}

ApplicationOptionList.propTypes = {
  options: PropTypes.array.isRequired
}

export default ApplicationOptionList
