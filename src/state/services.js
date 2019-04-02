import interests from 'resources/mock/interests'
import educationToLearningOpportunity from 'resources/mock/educationClassificationToLearningOpportunityCode'
import * as R from 'ramda'
import uuid from 'uuid/v4'
import { subtopicsLens } from 'state/helper'

export const Service = Object.freeze({
  getInterestSuggestions: 'getInterestSuggestions',
  mapEducationClassToLearningOpportunityCode: 'mapEducationClassToLearningOpportunityCode'
})

const services = {
// TODO: implement APIs
  [Service.getInterestSuggestions]: () => Promise.resolve(
    interests
      .slice(0, 25)
      .map(interest => R.assoc('id', uuid(), interest))
      .map(interest => R.assoc('selected', false, interest))
      .map(interest => R.over(subtopicsLens(),
        subtopics => subtopics
          .map(v => R.assoc('id', uuid(), v))
          .map(R.assoc('selected', false)),
        interest
      ))
  ),
  [Service.mapEducationClassToLearningOpportunityCode]: (ctx, _) => new Promise((resolve, reject) => {
    const educationClassificationCode = ctx.education.data.selection.specifier.id

    if (!educationClassificationCode || typeof educationClassificationCode !== 'string') {
      return reject(new Error('No education classification code provided: cannot map to learning opportunity'))
    }

    const learningOpportunityCode = educationToLearningOpportunity[educationClassificationCode]
    if (!learningOpportunityCode) {
      return reject(new Error(
        `Could not map education classification ${educationClassificationCode} to learning opportunity: ` +
        'No matching code was found'
      ))
    }

    return resolve(learningOpportunityCode)
  })
}

export default {
  ...services
}
