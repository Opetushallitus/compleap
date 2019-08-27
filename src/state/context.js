import * as R from 'ramda'
import { assign } from 'xstate'
import uuid from 'uuid/v4'
import {
  unverifiedEducationsLens,
  findSubtopicIndex,
  findTopicIndex,
  isSelectedLens,
  subtopicsLens,
  topicLens,
  updateVerifiedEducationUnitRating
} from 'state/helper'
import Rating from 'model/enum/Rating'

export const context = {
  version: process.env.CONTEXT_VERSION,
  user: {
    language: process.env.DEFAULT_LANGUAGE || 'en',
    isLoggedIn: false,
    name: undefined,
    profileId: undefined,
    id: null,
    profileImageURL: undefined
  },
  interests: {
    data: [],
    error: undefined
  },
  education: {
    data: {
      /**
       * @see {@link VerifiedEducationModelSchema.json }
       */
      verifiedEducations: [],
      /**
       * [{
       *   id: UUID,
       *   level: { id: EducationLevelId },
       *   specifier?: { id: FinnishEducationClassification2016id },
       *   code?: LearningOpportunityCodeUri (koulutuskoodiUri)
       * }]
       * TODO Add validation
       */
      unverifiedEducations: [],
      /**
       * { level: { id }, specifier?: { id } }
       */
      selection: undefined,
      // TODO Use separate errors for verified and unverified education
      error: undefined
    }
  },
  competences: {
    data: {
      /**
       * {
       *   [code: LearningOpportunityCodeUri]: Competence[]
       * }
       * @see {@link CompetenceModelSchema.json}
       */
      fromVerifiedEducation: {},
      /**
       * {
       *   [code: LearningOpportunityCodeUri]: Competence[]
       * }
       * @see {@link CompetenceModelSchema.json}
       */
      fromUnverifiedEducation: {}
    },
    error: {
      fromVerifiedEducation: undefined,
      fromUnverifiedEducation: undefined
    }
  },
  recommendations: {
    options: {
      locations: [],
      levels: []
    }
  }
}

export const Action = Object.freeze({
  selectLanguage: 'selectLanguage',
  enterName: 'enterName',
  selectProfile: 'selectProfile',
  setProfileImageURL: 'setProfileImageURL',
  logIn: 'logIn',
  reload: 'reload',
  setInterestsData: 'setInterestsData',
  setInterestsError: 'setInterestsError',
  toggleInterestSelection: 'toggleInterestSelection',
  selectUnverifiedEducationLevel: 'selectUnverifiedEducationLevel',
  selectUnverifiedEducationSpecifier: 'selectUnverifiedEducationSpecifier',
  clearUnverifiedEducationSelection: 'clearUnverifiedEducationSelection',
  clearUnverifiedEducationSpecifier: 'clearUnverifiedEducationSpecifier',
  addUnverifiedEducation: 'addUnverifiedEducation',
  removeUnverifiedEducation: 'removeUnverifiedEducation',
  addUnverifiedEducationCompetenceData: 'addUnverifiedEducationCompetenceData',
  removeUnverifiedEducationCompetenceData: 'removeUnverifiedEducationCompetenceData',
  setUnverifiedEducationCompetenceError: 'setUnverifiedEducationCompetenceError',
  setEducationError: 'setEducationError',
  setVerifiedEducationData: 'setVerifiedEducationData',
  setVerifiedEducationCompetenceData: 'setVerifiedEducationCompetenceData',
  setVerifiedEducationCompetenceError: 'setVerifiedEducationCompetenceError',
  likeEducationUnit: 'likeEducationUnit',
  dislikeEducationUnit: 'dislikeEducationUnit',
  addRecommendationLocationFilter: 'addRecommendationLocationFilter',
  removeRecommendationLocationFilter: 'removeRecommendationLocationFilter',
  addRecommendationLevelFilter: 'addRecommendationLevelFilter',
  removeRecommendationLevelFilter: 'removeRecommendationLevelFilter'
})

export const actions = {
  [Action.selectLanguage]: assign({
    user: (ctx, event) => R.assoc('language', event.data.language, ctx.user)
  }),
  [Action.enterName]: assign({
    user: (ctx, event) => R.assoc('name', event.data.name, ctx.user)
  }),
  [Action.selectProfile]: assign({
    user: (ctx, event) => R.assoc('profileId', event.data.id, ctx.user)
  }),
  [Action.setProfileImageURL]: assign({
    user: (ctx, event) => R.assoc('profileImageURL', event.data.url, ctx.user)
  }),
  [Action.logIn]: assign({
    user: (ctx, event) => R.merge(ctx.user, { isLoggedIn: true, id: event.data.id })
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
  [Action.selectUnverifiedEducationLevel]: assign({
    education: (ctx, event) => R.assocPath(['data', 'selection', 'level'], event.data, ctx.education)
  }),
  [Action.selectUnverifiedEducationSpecifier]: assign({
    education: (ctx, event) => R.assocPath(['data', 'selection', 'specifier'], event.data, ctx.education)
  }),
  [Action.clearUnverifiedEducationSelection]: assign({
    education: (ctx, _) => R.assocPath(['data', 'selection'], undefined, ctx.education)
  }),
  [Action.clearUnverifiedEducationSpecifier]: assign({
    education: (ctx, _) => R.dissocPath(['data', 'selection', 'specifier'], ctx.education)
  }),
  [Action.addUnverifiedEducation]: assign({
    education: (ctx, event) => {
      const educationData = R.merge(ctx.education.data.selection, { id: uuid(), code: event.data })
      return R.over(unverifiedEducationsLens(), R.append(educationData), ctx.education)
    }
  }),
  [Action.removeUnverifiedEducation]: assign({
    education: (ctx, event) => {
      const i = R.findIndex(({ id }) => id === event.data.id, ctx.education.data.unverifiedEducations)
      if (i === -1) {
        console.error(`Tried to remove education, but could not find one with id ${event.data.id}`)
        return
      }
      return R.dissocPath(['data', 'unverifiedEducations', i], ctx.education)
    }
  }),
  [Action.addUnverifiedEducationCompetenceData]: assign({
    competences: (ctx, event) => R.assocPath(['data', 'fromUnverifiedEducation', event.data.qualificationUri], event.data.competences, ctx.competences)
  }),
  [Action.removeUnverifiedEducationCompetenceData]: assign({
    competences: (ctx, event) => R.dissocPath(['data', 'fromUnverifiedEducation', event.data.code], ctx.competences)
  }),
  [Action.setUnverifiedEducationCompetenceError]: assign({
    competences: (ctx, event) => R.assocPath(['error', 'fromUnverifiedEducation'], event.data, ctx.competences)
  }),
  [Action.setEducationError]: assign({
    education: (ctx, event) => R.assoc('error', event.data, ctx.education)
  }),
  [Action.setVerifiedEducationData]: assign({
    education: (ctx, event) => R.assocPath(['data', 'verifiedEducations'], event.data, ctx.education)
  }),
  [Action.setVerifiedEducationCompetenceData]: assign({
    competences: (ctx, event) => R.assocPath(['data', 'fromVerifiedEducation'], event.data, ctx.competences)
  }),
  [Action.setVerifiedEducationCompetenceError]: assign({
    competences: (ctx, event) => R.assoc(['error', 'fromVerifiedEducation'], event.data, ctx.competences)
  }),
  [Action.likeEducationUnit]: assign({
    education: (ctx, event) => updateVerifiedEducationUnitRating(event.data.id, Rating.LIKE, ctx)
  }),
  [Action.dislikeEducationUnit]: assign({
    education: (ctx, event) => updateVerifiedEducationUnitRating(event.data.id, Rating.DISLIKE, ctx)
  }),
  [Action.addRecommendationLocationFilter]: assign({
    recommendations: (ctx, event) => R.over(R.lensPath(['options', 'locations']), R.append(event.data.id), ctx.recommendations)
  }),
  [Action.removeRecommendationLocationFilter]: assign({
    recommendations: (ctx, event) => R.over(R.lensPath(['options', 'locations']), R.reject(R.equals(event.data.id)), ctx.recommendations)
  }),
  [Action.addRecommendationLevelFilter]: assign({
    recommendations: (ctx, event) => R.over(R.lensPath(['options', 'levels']), R.append(event.data.id), ctx.recommendations)
  }),
  [Action.removeRecommendationLevelFilter]: assign({
    recommendations: (ctx, event) => R.over(R.lensPath(['options', 'levels']), R.reject(R.equals(event.data.id)), ctx.recommendations)
  })
}
