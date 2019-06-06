import React from 'react'
import PropTypes from 'prop-types'
import LocationFilter from './location-filter/LocationFilter'
import LevelFilter from 'component/recommendations/recommendation-results/level-filter/LevelFilter'
import RecommendationList from './recommendation-list/RecommendationList'
import { RecommendationsState } from 'state/recommendationStates'
import Alert from 'component/generic/widget/Alert'
import useTranslation from 'component/generic/hook/useTranslation'
import { withErrorBoundary } from 'component/generic/enhance/ErrorBoundary'

const RecommendationResults = ({ recommendations, status }) => {
  const t = useTranslation()

  if (status === RecommendationsState.failure) return <Alert level='error'><p>{t`Tapahtui odottamaton virhe eikä tietoja pystytä juuri nyt näyttämään.`}</p></Alert>

  return (
    <React.Fragment>
      <LevelFilter/>
      <LocationFilter/>
      <RecommendationList recommendations={recommendations} status={status}/>
    </React.Fragment>
  )
}

RecommendationResults.propTypes = {
  recommendations: PropTypes.any,
  status: PropTypes.oneOf(Object.values(RecommendationsState))
}

export default withErrorBoundary(RecommendationResults)
