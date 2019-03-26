import { useEffect, useState } from 'react'
import B from 'baconjs'
import * as R from 'ramda'
import { dispatch } from 'state/state'
import { RecommendationsStatusEvent } from 'state/events'
import { subtopicsLens } from 'state/helper'
import mockRequest from 'util/mockRequest'

const MinInterestsRequired = 5

const extractSubtopics = R.compose(R.flatten, R.map(R.view(subtopicsLens())))
const withoutSubtopics = R.map(R.omit('subtopics'))
const countSelectedTopics = R.compose(R.length, R.filter(R.propEq('selected', true)))

// TODO Implement API
const doQueryRecommendations = ({ educations, interests }) => {
  dispatch(RecommendationsStatusEvent.QUERY_PENDING)

  return mockRequest(
    { educations, interests },
    { status: 'ok', data: Math.floor(Math.random() * Math.floor(100)) }, // random placeholder data
    true
  )
}

export default (educations$, interests$) => {
  const [results, setResults] = useState()
  const [hasRequiredInterest, setHasRequiredInterest] = useState()

  useEffect(() => {
    const flattenedTopics$ = interests$.map(interests => R.concat(withoutSubtopics(interests), extractSubtopics(interests)))
    const numSelectedInterests$ = flattenedTopics$.map(countSelectedTopics)
    const hasRequiredInterests$ = numSelectedInterests$.map(v => v >= MinInterestsRequired).toProperty()

    const queryParams$ = B.combineTemplate({ educations: educations$, interests: interests$ })
    const query$ = queryParams$
      .filter(hasRequiredInterests$)
      .skipDuplicates(R.equals)
      .flatMapLatest(params => B.fromPromise(doQueryRecommendations(params)))

    const subscriptions = [
      hasRequiredInterests$
        .skipDuplicates()
        .onValue(setHasRequiredInterest),

      query$
        .onValue(results => {
          setResults(results)
          dispatch(RecommendationsStatusEvent.QUERY_SUCCESS)
        }),

      query$
        .onError(() => dispatch(RecommendationsStatusEvent.QUERY_FAILURE))
    ]

    return () => subscriptions.forEach(dispose => dispose())
  }, [])

  return [results, hasRequiredInterest]
}
