import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { RecommendationsState } from 'state/recommendationStates'
import Placeholder from 'component/recommendations/recommendation-list/placeholder/Placeholder'
import Recommendation from 'component/recommendations/recommendation-list/recommendation/Recommendation'

// TODO pass actual recommendation data to Recommendations

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  align-self: stretch;
`

const ListItem = styled.li`
  margin: 1rem 0;
`

const RecommendationList = ({ recommendations, status }) => {
  if (status === RecommendationsState.pending) return <Placeholder/>

  return (
    <List>
      {recommendations.map(tempData => <ListItem key={tempData}><Recommendation recommendationData={{}}/></ListItem>)}
    </List>
  )
}

RecommendationList.propTypes = {
  recommendations: PropTypes.any,
  status: PropTypes.oneOf(Object.values(RecommendationsState))
}

export default RecommendationList
