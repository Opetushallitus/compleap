import * as R from 'ramda'
import { subtopicsLens } from 'state/helper'

export const pickAndFlattenUnverifiedEducation = unverifiedEducations$ => unverifiedEducations$.map(educations =>
  educations.filter(v => !!v.code).map(v => v.code)
)

const pickVerifiedEducation = educations => {
  const hasUpvoted = educations.some(ed => ed.rating === 'LIKE')
  const hasDownvoted = educations.some(ed => ed.rating === 'DISLIKE')

  if (!hasUpvoted && !hasDownvoted) return educations
  else if (!hasUpvoted && hasDownvoted) return educations.filter(ed => ed.rating !== 'DISLIKE')
  return educations.filter(ed => ed.rating === 'LIKE')
}

export const pickAndFlattenVerifiedEducation = verifiedEducations$ => verifiedEducations$.map(educations =>
  educations.flatMap(education => pickVerifiedEducation(education.children).map(v => v.uri))
)

export const pickAndFlattenInterests = interests$ => interests$.map(interests =>
  interests.filter(interest => interest.selected).map(interest => [
    interest.id,
    interest.subtopics.filter(subtopic => subtopic.selected).map(subtopic => subtopic.id)
  ]).flat(2)
)

const extractSubtopics = R.compose(R.flatten, R.map(R.view(subtopicsLens())))
const withoutSubtopics = R.map(R.omit('subtopics'))
const countSelectedTopics = R.compose(R.length, R.filter(R.propEq('selected', true)))

export const countSelectedInterests = interests$ => {
  const flattenedTopics$ = interests$.map(interests => R.concat(withoutSubtopics(interests), extractSubtopics(interests)))
  return flattenedTopics$.map(countSelectedTopics)
}

export const resolveApplicationStatus = applicationOption => {
  const { id, applicationOnGoing, applicationStart, applicationEnd } = applicationOption

  if (applicationOnGoing) {
    if (applicationEnd && Date.now() > applicationEnd) {
      console.error(
        `Stale recommendation encountered (${id}): ` +
        `application end time (${applicationEnd}) is in the past, but application is marked as ongoing.`
      )

      return ({ message: 'Haku päättynyt' })
    }

    if (applicationStart && Date.now() < applicationStart) {
      console.error(
        `Mismatching application period in ${id}: ` +
        `application start time (${applicationStart}) is in the future, but application is marked as ongoing.`
      )

      return ({
        message: 'Haku alkaa',
        parameter: new Date(applicationStart)
      })
    }

    return ({ message: 'Haku käynnissä' })
  }

  if (applicationStart && Date.now() < applicationStart) {
    return ({
      message: 'Haku alkaa',
      parameter: new Date(applicationStart)
    })
  }

  if (applicationEnd && Date.now() > applicationEnd) {
    return ({ message: 'Haku päättynyt' })
  }

  if (applicationStart && applicationEnd && applicationStart <= Date.now() <= applicationEnd) {
    console.error(
      `Mismatching application period in ${id}: ` +
      `Application is not marked as ongoing, but start time (${applicationStart}) is in the past and end time (${applicationEnd}) in the future.`
    )

    return ({ message: 'Haku käynnissä' })
  }

  console.error(
    `Ill-defined application status in ${id}: application start is ${applicationStart}, end is ${applicationEnd}, and ongoing-status is ${applicationOnGoing}.`
  )

  return ({ message: '' })
}
