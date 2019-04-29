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
