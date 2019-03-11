import * as R from 'ramda'
import { assign } from 'xstate'
import { findSubtopicIndex, findTopicIndex, isSelectedLens, subtopicsLens, topicLens } from 'state/helper'

export const context = {
  interests: {
    data: [],
    error: undefined
  }
}

export const Action = Object.freeze({
  setInterestsData: 'setInterestsData',
  setInterestsError: 'setInterestsError',
  toggleInterestSelection: 'toggleInterestSelection'
})

export const actions = {
  [Action.setInterestsData]: assign({
    interests: (ctx, event) => R.assoc('data', event.data, ctx.interests)
  }),
  [Action.setInterestsError]: assign({
    interests: (ctx, event) => R.assoc('error', event.data, ctx.interests)
  }),
  [Action.toggleInterestSelection]: assign({
    interests: (ctx, event) => {
      const isChild = !!event.data.parentId

      if (isChild) {
        const parentIndex = findTopicIndex(event.data.parentId, ctx)
        const selfIndex = findSubtopicIndex(event.data.id, parentIndex, ctx)
        const lens = R.compose(topicLens(parentIndex), subtopicsLens(), R.lensIndex(selfIndex), isSelectedLens())
        return R.over(lens, R.not, ctx.interests)
      } else {
        const index = findTopicIndex(event.data.id, ctx)
        const withToggledSelf = R.over(R.compose(topicLens(index), isSelectedLens()), R.not, ctx.interests)
        const isSelected = R.view(R.compose(topicLens(index), isSelectedLens()), ctx.interests)
        return isSelected
          ? R.over(
            R.compose(topicLens(index), subtopicsLens()),
            subtopics => subtopics.map(st => R.set(isSelectedLens(), false, st)),
            withToggledSelf
          )
          : withToggledSelf
      }
    }
  })
}
