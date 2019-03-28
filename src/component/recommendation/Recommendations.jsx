import React, { useContext } from 'react'
import B from 'baconjs'
import * as R from 'ramda'
import t from 'util/translate'
import { H1 } from 'ui/typography'
import { Context } from 'state/state'
import { subtopicsLens } from 'state/helper'
import useObservable from 'component/generic/hook/useObservable'
import useRecommendationsQuery from 'component/recommendation/useRecommendationsQuery'
import RecommendationResults from 'component/recommendation/RecommendationResults'
import RequireInterestsMessage from 'component/recommendation/RequireInterestsMessage'

const MIN_INTERESTS_REQUIRED = 5

const extractSubtopics = R.compose(R.flatten, R.map(R.view(subtopicsLens())))
const withoutSubtopics = R.map(R.omit('subtopics'))
const countSelectedTopics = R.compose(R.length, R.filter(R.propEq('selected', true)))

const Recommendations = () => {
  const context$ = useContext(Context)
  const status = useObservable(context$, { path: ['value', 'profile', 'recommendations'] })

  const educations$ = context$.map(({ context }) => context.education.data.educations)
  const interests$ = context$.map(({ context }) => context.interests.data)

  const flattenedTopics$ = interests$.map(interests => R.concat(withoutSubtopics(interests), extractSubtopics(interests)))
  const numSelectedInterests$ = flattenedTopics$.map(countSelectedTopics)
  const hasRequiredInterests$ = numSelectedInterests$.map(v => v >= MIN_INTERESTS_REQUIRED).toProperty()

  const queryParams$ = B.combineTemplate({ educations: educations$, interests: interests$ })

  const recommendations = useRecommendationsQuery(queryParams$, hasRequiredInterests$)
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
