import { useEffect, useState } from 'react'
import B from 'baconjs'
import * as R from 'ramda'
import { dispatch } from 'state/state'
import { RecommendationsStatusEvent } from 'state/events'
import mockRequest from 'util/mockRequest'
import http from 'http/http'

const QueryDebounceMs = 1000
const NumRecommendations = 20

const doQueryRecommendations = ({ unverifiedEducations, verifiedEducations, interests }) => {
  dispatch(RecommendationsStatusEvent.QUERY_PENDING)

  if (process.env.API_ENDPOINT === 'mock') {
    const mockRecommendations = require('resources/mock/recommendations/mockRecommendations')
    return mockRequest({ unverifiedEducations, verifiedEducations, interests }, mockRecommendations, true)
  }

  return (
    http.get(
      process.env.API_ENDPOINT, {
        uris: verifiedEducations,
        terms: interests,
        n: NumRecommendations
      }, {
        encode: false,
        arrayFormat: 'comma'
      }
    ).then(res => res[0])
  )
}

export default (queryParams$, shouldDoQuery$) => {
  const [results, setResults] = useState()

  useEffect(() => {
    const paramChange$ = queryParams$
      .skipDuplicates(R.equals)

    const query$ = queryParams$
      .skipDuplicates(R.equals)
      .filter(shouldDoQuery$)
      .debounce(QueryDebounceMs)
      .flatMapLatest(params => B.fromPromise(doQueryRecommendations(params)))

    const subscriptions = [
      paramChange$
        .onValue(() => dispatch(RecommendationsStatusEvent.QUERY_PARAM_CHANGE)),

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
