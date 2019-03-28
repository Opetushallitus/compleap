import { useEffect, useState } from 'react'
import B from 'baconjs'
import * as R from 'ramda'
import { dispatch } from 'state/state'
import { RecommendationsStatusEvent } from 'state/events'
import mockRequest from 'util/mockRequest'

// TODO Implement API
const doQueryRecommendations = ({ educations, interests }) => {
  dispatch(RecommendationsStatusEvent.QUERY_PENDING)

  return mockRequest(
    { educations, interests },
    { status: 'ok', data: Math.floor(Math.random() * Math.floor(100)) }, // random placeholder data
    true
  )
}

export default (queryParams$, shouldDoQuery$) => {
  const [results, setResults] = useState()

  useEffect(() => {
    const query$ = queryParams$
      .filter(shouldDoQuery$)
      .skipDuplicates(R.equals)
      .flatMapLatest(params => B.fromPromise(doQueryRecommendations(params)))

    const subscriptions = [
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

  return results
}
