import React from 'react'
import PropTypes from 'prop-types'
import { RecommendationsState } from 'state/recommendationStates'
import Placeholder from 'component/recommendations/recommendation-list/placeholder/Placeholder'
import Recommendation from 'component/recommendations/recommendation-list/recommendation/Recommendation'

// TODO pass actual recommendation data to Recommendations

const RecommendationList = ({ recommendations, status }) => {
  if (status === RecommendationsState.pending) return <Placeholder loading={true}/> // TODO replace with actual loading indicator

  return recommendations.map(tempData => <Recommendation key={tempData} recommendationData={{}}/>)
}

RecommendationList.propTypes = {
  recommendations: PropTypes.any,
  status: PropTypes.oneOf(Object.values(RecommendationsState))
}

export default RecommendationList
