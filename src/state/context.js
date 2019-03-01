import * as R from 'ramda'
import { assign } from 'xstate'

export const context = {
  interests: {
    suggestions: {
      data: [],
      error: undefined
    }
  }
}

export const actions = {
  setInterestSuggestionsData: assign({
    interests: (ctx, event) => R.merge(ctx.interests, { suggestions: { data: event.data } })
  }),
  setInterestSuggestionsError: assign({
    interests: (ctx, event) => R.merge(ctx.interests, { suggestions: { error: event.data } })
  })
}
