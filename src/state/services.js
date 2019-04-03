import interests from 'resources/mock/interests'
import educationToLearningOpportunity from 'resources/mock/educationClassificationToLearningOpportunityCode'
import * as R from 'ramda'
import uuid from 'uuid/v4'
import { subtopicsLens } from 'state/helper'
import { isVocational } from 'util/educationHelper'
import { stopPersisting } from 'state/state'

export const Service = Object.freeze({
  getInterestSuggestions: 'getInterestSuggestions',
  mapEducationClassToLearningOpportunityCode: 'mapEducationClassToLearningOpportunityCode',
  clearSession: 'clearSession'
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
  /*
  We are using national education classification 2016 (based on ISCED) for education options.
  Here we map this user-selected option to a matching learning opportunity.
  By doing this we can associate the option with descriptive learning opportunity information from the eRequirements service.
  This will be used as a substitute for actual, personal education records (such as Koski data) for users that don't have such records.

  TODO: replace mock with actual service
  Here we mock the mapping calls, but the actual relevant Koodisto Service API is /json/relaatio/sisaltyy-ylakoodit/{koodiUri}.
  E.g. https://virkailija.opintopolku.fi/koodisto-service/rest/json/relaatio/sisaltyy-ylakoodit/kansallinenkoulutusluokitus2016koulutusalataso3_1013
   */
  [Service.mapEducationClassToLearningOpportunityCode]: (ctx, _) => new Promise((resolve, reject) => {
    const { level, specifier } = ctx.education.data.selection
    if (!isVocational(level.id)) {
      console.debug(`Skipping learning opportunity mapping: unsupported type ${level.id}`)
      return resolve(undefined)
    }

    const educationClassificationCode = specifier && specifier.id
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
  }),

  [Service.clearSession]: () => {
    stopPersisting()

    return new Promise((resolve, reject) => {
      const delay = process.env.MOCK_API_LATENCY_MS || 0

      setTimeout(() => {
        try {
          window.localStorage.clear()
          return resolve()
        } catch (e) {
          console.error(e)
          return reject(e)
        }
      }, delay)
    })
  }
}

export default {
  ...services
}
