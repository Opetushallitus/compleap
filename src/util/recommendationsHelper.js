const INPUT_LANG_FOR_RECOMMENDATIONS = 'fi'

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
    interest.topic,
    interest.subtopics.filter(subtopic => subtopic.selected).map(subtopic => subtopic.topic)
  ]).flat(2).map(langs => langs[INPUT_LANG_FOR_RECOMMENDATIONS])
)

export const resolveApplicationStatus = applicationOption => {
  const { document, applicationOnGoing, applicationStart, applicationEnd } = applicationOption

  if (applicationOnGoing) {
    if (applicationEnd && Date.now() > applicationEnd) {
      console.error(
        `Stale recommendation encountered (${document}): ` +
        `application end time (${applicationEnd}) is in the past, but application is marked as ongoing.`
      )

      return ({ message: 'Haku päättynyt' })
    }

    if (applicationStart && Date.now() < applicationStart) {
      console.error(
        `Mismatching application period for ${document}: ` +
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
      `Mismatching application period for ${document}: ` +
      `Application is not marked as ongoing, but start time (${applicationStart}) is in the past and end time (${applicationEnd}) in the future.`
    )

    return ({ message: 'Haku käynnissä' })
  }

  console.error(
    `Ill-defined application status: application start is ${applicationStart}, end is ${applicationEnd}, and ongoing-status is ${applicationOnGoing}.`
  )

  return ({ message: '' })
}
