const INPUT_LANG_FOR_RECOMMENDATIONS = 'fi'

export const flattenUnverifiedEducation = unverifiedEducations$ => unverifiedEducations$.map(educations =>
  educations.filter(v => !!v.code).map(v => v.code)
)

export const flattenVerifiedEducation = verifiedEducations$ => verifiedEducations$.map(educations =>
  educations.flatMap(education => education.children.map(v => v.uri))
)

export const flattenInterests = interests$ => interests$.map(interests =>
  interests.filter(interest => interest.selected).map(interest => [
    interest.topic,
    interest.subtopics.filter(subtopic => subtopic.selected).map(subtopic => subtopic.topic)
  ]).flat(2).map(langs => langs[INPUT_LANG_FOR_RECOMMENDATIONS])
)
