import * as R from 'ramda'
import Rating from 'model/enum/Rating'

export const findTopicIndex = (id, ctx) => R.findIndex(R.propEq('id', id), ctx.interests.data)
export const findSubtopicIndex = (id, parentIndex, ctx) => R.findIndex(R.propEq('id', id), ctx.interests.data[parentIndex].subtopics)

export const topicLens = index => R.lensPath(['data', index])
export const subtopicsLens = () => R.lensProp('subtopics')
export const isSelectedLens = () => R.lensProp('selected')

export const unverifiedEducationsLens = () => R.lensPath(['data', 'unverifiedEducations'])

export const findVerifiedEducationIndexByChildId = (childId, ctx) =>
  R.findIndex(record => R.any(R.propEq('id', childId), record.children), ctx.education.data.verifiedEducations)
export const findVerifiedEducationUnitIndex = (id, parentIndex, ctx) =>
  R.findIndex(R.propEq('id', id), ctx.education.data.verifiedEducations[parentIndex].children)

export const updateVerifiedEducationUnitRating = (id, rating, ctx) => {
  const parentIndex = findVerifiedEducationIndexByChildId(id, ctx)
  const unitIndex = findVerifiedEducationUnitIndex(id, parentIndex, ctx)

  return R.over(
    R.lensPath(['data', 'verifiedEducations', parentIndex, 'children', unitIndex, 'rating']),
    currentRating => currentRating === rating ? Rating.NONE : rating,
    ctx.education
  )
}
