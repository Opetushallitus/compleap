import React from 'react'
import PropTypes from 'prop-types'
import { RecommendationsState } from 'state/recommendationStates'
import RecommendationsPlaceholder from 'component/recommendation/RecommendationsPlaceholder'

// TODO TBD
const RecommendationResults = ({ recommendations, status }) => {
  if (status === RecommendationsState.pending) return <RecommendationsPlaceholder loading={true}/> // TODO replace with actual loading indicator

  return <RecommendationsPlaceholder/>
}

RecommendationResults.propTypes = {
  recommendations: PropTypes.any,
  status: PropTypes.oneOf(Object.values(RecommendationsState))
}

export default RecommendationResults
