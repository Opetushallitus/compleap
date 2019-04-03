import * as R from 'ramda'

export const findTopicIndex = (id, ctx) => R.findIndex(R.propEq('id', id), ctx.interests.data)
export const findSubtopicIndex = (id, parentIndex, ctx) => R.findIndex(R.propEq('id', id), ctx.interests.data[parentIndex].subtopics)

export const topicLens = index => R.lensPath(['data', index])
export const subtopicsLens = () => R.lensProp('subtopics')
export const isSelectedLens = () => R.lensProp('selected')

export const unverifiedEducationsLens = () => R.lensPath(['data', 'unverifiedEducations'])
