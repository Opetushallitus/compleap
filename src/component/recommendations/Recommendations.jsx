import React, { useContext } from 'react'
import B from 'baconjs'
import * as R from 'ramda'
import useTranslation from 'component/generic/hook/useTranslation'
import { H1 } from 'ui/typography'
import { Context } from 'state/state'
import { subtopicsLens } from 'state/helper'
import { flattenInterests, flattenUnverifiedEducation, flattenVerifiedEducation } from 'util/recommendationsQueryDataHelper'
import useObservable from 'component/generic/hook/useObservable'
import useRecommendationsQuery from 'component/recommendations/useRecommendationsQuery'
import RecommendationResults from 'component/recommendations/recommendation-results/RecommendationResults'
import RequireInterestsMessage from 'component/recommendations/require-interests/RequireInterestsMessage'

const MIN_INTERESTS_REQUIRED = 5

const extractSubtopics = R.compose(R.flatten, R.map(R.view(subtopicsLens())))
const withoutSubtopics = R.map(R.omit('subtopics'))
const countSelectedTopics = R.compose(R.length, R.filter(R.propEq('selected', true)))

const Recommendations = () => {
  const context$ = useContext(Context)
  const t = useTranslation()
  const status = useObservable(context$, { path: ['value', 'profile', 'recommendations'] })

  const unverifiedEducations$ = context$.map(({ context }) => context.education.data.unverifiedEducations)
  const verifiedEducations$ = context$.map(({ context }) => context.education.data.verifiedEducations)
  const interests$ = context$.map(({ context }) => context.interests.data)

  const flattenedTopics$ = interests$.map(interests => R.concat(withoutSubtopics(interests), extractSubtopics(interests)))
  const numSelectedInterests$ = flattenedTopics$.map(countSelectedTopics)
  const hasRequiredInterests$ = numSelectedInterests$.map(v => v >= MIN_INTERESTS_REQUIRED).toProperty()

  const queryParams$ = B.combineTemplate({
    unverifiedEducations: flattenUnverifiedEducation(unverifiedEducations$),
    verifiedEducations: flattenVerifiedEducation(verifiedEducations$),
    interests: flattenInterests(interests$)
  })
  // TODO Remove extra condition after other options for querying recommendations are implemented (query by interests, unverified edu)
  const doQueryWhen$ = hasRequiredInterests$.and(verifiedEducations$.map(v => v.length !== 0))
  const recommendationsResponse = useRecommendationsQuery(queryParams$, doQueryWhen$)

  const recommendations = recommendationsResponse || []
  const hasRequiredInterests = useObservable(hasRequiredInterests$, { skipDuplicates: true })

  return (
    <React.Fragment>
      <H1>{t`Suositellut opiskelupaikat`}</H1>
      <p>
        {t`Näytetään opintojesi ja valitsemiesi kiinnostusten perusteella sinulle sopivimpia opiskelupaikkoja hakualueeltasi. Voit halutessasi rajata aluetta tarkemmin.`}
      </p>
      {
        hasRequiredInterests
          ? <RecommendationResults recommendations={recommendations} status={status}/>
          : <RequireInterestsMessage/>
      }
    </React.Fragment>
  )
}

export default Recommendations
