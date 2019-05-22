import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import styled from 'styled-components'
import regions from 'resources/regions'
import useTranslation from 'component/generic/hook/useTranslation'
import useObservable from 'component/generic/hook/useObservable'
import { Context } from 'state/state'
import { RecommendationsState } from 'state/recommendationStates'
import Recommendation from 'model/Recommendation'
import Placeholder from './Placeholder'
import RecommendationGroup from './recommendation-group/RecommendationGroup'
import Alert from 'component/generic/widget/Alert'

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

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  align-self: stretch;
  min-height: 15rem;
`

const ListItem = styled.li`
  margin: 1rem 0;
`

const NoResultsContainer = styled.div`
  min-height: 13rem;
  align-self: stretch;
  margin: 1rem 0;
`

const RecommendationList = ({ recommendations, status }) => {
  const t = useTranslation()
  const context$ = useContext(Context)

  const validatedRecommendations = recommendations.map(recommendation => Recommendation(recommendation))

  const locationIdWhitelist = useObservable(context$, { path: ['context', 'recommendations', 'options', 'locations'] })
  const existingVerifiedEducation = useObservable(context$, { path: ['context', 'education', 'data', 'verifiedEducations'] }).map(v => v.uri)

  const optionsWithoutExistingVerified = validatedRecommendations.filter(({ koulutuskoodi }) => !existingVerifiedEducation.includes(koulutuskoodi))
  const optionsWithRegionIds = optionsWithoutExistingVerified.map(option => R.assoc('regionId', findRegionId(option.providerProvince), option))
  const currentMatchingOptions = locationIdWhitelist.length > 0 ? optionsWithRegionIds.filter(option => locationIdWhitelist.includes(option.regionId)) : optionsWithRegionIds

  const groupedBySpecialisation = R.compose(Object.entries, R.groupBy(v => v.name))(currentMatchingOptions)

  if (status === RecommendationsState.idle) return <Placeholder showSpinner={false}/>
  if (status === RecommendationsState.pending) return <Placeholder showSpinner={true}/>
  if (groupedBySpecialisation.length === 0) return <NoResultsContainer><Alert level='warn'><p>{t`Ei hakukohteita nykyisillä rajauksilla`}</p></Alert></NoResultsContainer>

  return (
    <List>
      {groupedBySpecialisation.map(([specialisation, recommendations]) => (
        <ListItem key={specialisation}>
          <RecommendationGroup recommendations={recommendations}/>
        </ListItem>
      ))}
    </List>
  )
}

RecommendationList.propTypes = {
  recommendations: PropTypes.any,
  status: PropTypes.oneOf(Object.values(RecommendationsState))
}

export default RecommendationList
