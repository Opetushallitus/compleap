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

export const toggleAllCompetenceInstances = (ctx, uri) => {
  const selectionStateLens = R.lensProp('selected')
  const toggleAllInstances = R.mapObjIndexed(competences => competences.map(c => {
    return c.conceptUri === uri
      ? R.over(selectionStateLens, v => !v, c)
      : c
  }))

  const updatedVerified = toggleAllInstances(ctx.competences.data.fromVerifiedEducation)
  const updatedUnverified = toggleAllInstances(ctx.competences.data.fromUnverifiedEducation)

  const update = R.compose(
    R.assocPath(['data', 'fromUnverifiedEducation'], updatedUnverified),
    R.assocPath(['data', 'fromVerifiedEducation'], updatedVerified)
  )

  return update(ctx.competences)
}

export const getCompetenceSelectionState = (ctx, uri) => {
  const competence = R.compose(
    R.find(R.propEq('conceptUri', uri)),
    R.flatten,
    R.map(R.values),
    R.values,
    R.pick(['fromVerifiedEducation', 'fromUnverifiedEducation'])
  )(ctx.competences.data)

  return competence ? competence.selected : false
}
