import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'component/generic/hook/useTranslation'
import { RecommendationsState } from 'state/recommendationStates'
import Alert from 'component/generic/widget/Alert'
import RecommendationDetails from 'component/recommendations/model-comparison/fragment/RecommendationDetails'
import ComparisonTable from 'component/recommendations/model-comparison/fragment/ComparisonTable'
import LevelFilter from 'component/recommendations/recommendation-results/level-filter/LevelFilter'
import LocationFilter from 'component/recommendations/recommendation-results/location-filter/LocationFilter'

const ModelComparison = ({ recommendations, status }) => {
  const t = useTranslation()
  const [detailsObj, setDetailsObj] = useState(null)

  if (status === RecommendationsState.failure) return <Alert level='error'><p>{t`Tapahtui odottamaton virhe eikä tietoja pystytä juuri nyt näyttämään.`}</p></Alert>

  return (
    <React.Fragment>
      <LevelFilter/>
      <LocationFilter/>
      <ComparisonTable results={recommendations}/>
      {detailsObj && <RecommendationDetails details={detailsObj} onClose={() => setDetailsObj(null)}/>}
    </React.Fragment>
  )
}

ModelComparison.propTypes = {
  recommendations: PropTypes.any,
  status: PropTypes.oneOf(Object.values(RecommendationsState))
}

export default ModelComparison
