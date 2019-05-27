import { useEffect, useState } from 'react'
import B from 'baconjs'
import * as R from 'ramda'
import { dispatch } from 'state/state'
import { RecommendationsStatusEvent } from 'state/events'
import mockRequest from 'util/mockRequest'
import http from 'http/http'

const QueryDebounceMs = 1000
const NumRecommendations = 10

const doQueryRecommendations = (endpoint, { unverifiedEducations, verifiedEducations, interests }) => {
  dispatch(RecommendationsStatusEvent.QUERY_PENDING)

  if (process.env.API_ENDPOINT === 'mock') {
    const mockRecommendations = require('resources/mock/recommendations/mockRecommendations')
    return mockRequest({ unverifiedEducations, verifiedEducations, interests }, mockRecommendations, true)
  }

  const type = verifiedEducations.length > 0 ? 'unit' : unverifiedEducations.length > 0 ? 'qualification' : undefined

  return (
    http.get(
      endpoint, {
        uris: type === 'unit' ? verifiedEducations : type === 'qualification' ? unverifiedEducations : undefined,
        terms: interests,
        n: NumRecommendations,
        type
      }, {
        encode: false,
        arrayFormat: 'comma'
      }
    ).then(res => res[0])
  )
}

export default (endpoint, queryParams$, shouldDoQuery$) => {
  const [results, setResults] = useState()

  useEffect(() => {
    const paramChange$ = queryParams$
      .skipDuplicates(R.equals)

    const query$ = queryParams$
      .skipDuplicates(R.equals)
      .filter(shouldDoQuery$)
      .debounce(QueryDebounceMs)
      .flatMapLatest(params => B.fromPromise(doQueryRecommendations(endpoint, params)))

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
