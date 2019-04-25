import { InteractionEvent, RecommendationsStatusEvent } from 'state/events'
import { Action } from 'state/context'

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
        [RecommendationsStatusEvent.QUERY_PARAM_CHANGE]: RecommendationsState.idle,
        [RecommendationsStatusEvent.QUERY_SUCCESS]: RecommendationsState.success,
        [RecommendationsStatusEvent.QUERY_FAILURE]: RecommendationsState.failure
      }
    },
    [RecommendationsState.success]: {
      on: {
        [RecommendationsStatusEvent.QUERY_PARAM_CHANGE]: RecommendationsState.idle
      }
    },
    [RecommendationsState.failure]: {
      on: {
        [RecommendationsStatusEvent.QUERY_PARAM_CHANGE]: RecommendationsState.idle
      }
    }
  },
  on: {
    [InteractionEvent.ADD_RECOMMENDATION_LOCATION_FILTER]: {
      actions: Action.addRecommendationLocationFilter
    },
    [InteractionEvent.REMOVE_RECOMMENDATION_LOCATION_FILTER]: {
      actions: Action.removeRecommendationLocationFilter
    }
  }
}

export default recommendationStates
