import * as R from 'ramda'
import { assign } from 'xstate'
import uuid from 'uuid/v4'
import {
  unverifiedEducationsLens,
  findSubtopicIndex,
  findTopicIndex,
  isSelectedLens,
  subtopicsLens,
  topicLens
} from 'state/helper'

export const context = {
  version: process.env.CONTEXT_VERSION,
  user: {
    isLoggedIn: false
  },
  interests: {
    data: [],
    error: undefined
  },
  education: {
    data: {
      /**
       * [{ id, level: { id }, specifier?: { id }, code }]
       */
      unverifiedEducations: [],
      /**
       * { level: { id }, specifier?: { id } }
       */
      selection: undefined,
      error: undefined
    }
  }
}

export const Action = Object.freeze({
  logIn: 'logIn',
  reload: 'reload',
  setInterestsData: 'setInterestsData',
  setInterestsError: 'setInterestsError',
  toggleInterestSelection: 'toggleInterestSelection',
  selectEducation: 'selectEducation',
  selectEducationSpecifier: 'selectEducationSpecifier',
  clearEducationSelection: 'clearEducationSelection',
  clearEducationSpecifier: 'clearEducationSpecifier',
  addEducation: 'addEducation',
  removeEducation: 'removeEducation',
  setEducationError: 'setEducationError'
})

export const actions = {
  [Action.logIn]: assign({
    user: (ctx, _) => R.assoc('isLoggedIn', true, ctx.user)
  }),
  [Action.reload]: () => window.location.reload(),
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
            subtopics => subtopics.map(R.set(isSelectedLens(), false)),
            withToggledSelf
          )
          : withToggledSelf
      }
    }
  }),
  [Action.selectEducation]: assign({
    education: (ctx, event) => R.assocPath(['data', 'selection', 'level'], event.data, ctx.education)
  }),
  [Action.selectEducationSpecifier]: assign({
    education: (ctx, event) => R.assocPath(['data', 'selection', 'specifier'], event.data, ctx.education)
  }),
  [Action.clearEducationSelection]: assign({
    education: (ctx, _) => R.assocPath(['data', 'selection'], undefined, ctx.education)
  }),
  [Action.clearEducationSpecifier]: assign({
    education: (ctx, _) => R.dissocPath(['data', 'selection', 'specifier'], ctx.education)
  }),
  [Action.addEducation]: assign({
    education: (ctx, event) => {
      const educationData = R.merge(ctx.education.data.selection, { id: uuid(), code: event.data })
      return R.over(unverifiedEducationsLens(), R.append(educationData), ctx.education)
    }
  }),
  [Action.removeEducation]: assign({
    education: (ctx, event) => {
      const i = R.findIndex(({ id }) => id === event.data.id, ctx.education.data.unverifiedEducations)
      if (i === -1) {
        console.error(`Tried to remove education, but could not find one with id ${event.data.id}`)
        return
      }
      return R.dissocPath(['data', 'unverifiedEducations', i], ctx.education)
    }
  }),
  [Action.setEducationError]: assign({
    education: (ctx, event) => R.assoc('error', event.data, ctx.education)
  })
}
