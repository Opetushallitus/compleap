import { RecommendationsStatusEvent } from 'state/events'

export const RecommendationsState = Object.freeze({
  idle: 'idle',
  pending: 'pending',
  success: 'success',
  failure: 'failure'
})

const recommendationStates = {
  initial: RecommendationsState.idle,
  states: {
    [RecommendationsState.idle]: {
      on: {
        [RecommendationsStatusEvent.QUERY_PENDING]: RecommendationsState.pending
      }
    },
    [RecommendationsState.pending]: {
      on: {
        [RecommendationsStatusEvent.QUERY_SUCCESS]: RecommendationsState.success,
        [RecommendationsStatusEvent.QUERY_FAILURE]: RecommendationsState.failure
      }
    },
    [RecommendationsState.success]: {
      on: {
        [RecommendationsStatusEvent.QUERY_PENDING]: RecommendationsState.pending
      }
    },
    [RecommendationsState.failure]: {
      on: {
        [RecommendationsStatusEvent.QUERY_PENDING]: RecommendationsState.pending
      }
    }
  }
}

export default recommendationStates
