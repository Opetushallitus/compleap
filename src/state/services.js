import interests from 'resources/mock/interests'
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
  [Service.mapEducationClassToLearningOpportunityCode]: () => Promise.resolve(
    { code: 1 }
  )
}

export default {
  ...services
}
