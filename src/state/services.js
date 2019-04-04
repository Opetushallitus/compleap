import interests from 'resources/mock/interests'
import educationToLearningOpportunity from 'resources/mock/educationClassificationToLearningOpportunityCode'
import koskiData from 'resources/mock/koski/luontoJaYmparistoalanPerustutkinto'
import * as R from 'ramda'
import uuid from 'uuid/v4'
import { subtopicsLens } from 'state/helper'
import { isVocational } from 'util/educationHelper'
import { stopPersisting } from 'state/state'
import VerifiedEducation from 'model/VerifiedEducation'
import { koulutusmoduuliTunnisteToCodeUri, tutkinnonosaTunnisteToCodeUri } from 'util/koski'

export const Service = Object.freeze({
  getInterestSuggestions: 'getInterestSuggestions',
  mapEducationClassToLearningOpportunityCode: 'mapEducationClassToLearningOpportunityCode',
  getVerifiedEducations: 'getVerifiedEducations',
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

  [Service.getVerifiedEducations]: () => {
    const parseKoskiData = koskiData => {
      const placeOfStudyLens = R.lensPath(['toimipiste', 'nimi'])
      const identifierLens = R.lensPath(['koulutusmoduuli', 'tunniste'])
      const nameLens = R.lensProp('nimi')
      const moduleNameLens = R.compose(identifierLens, nameLens)
      const qualificationTitlesLens = R.lensProp('tutkintonimike')
      const confirmationLens = R.lensPath(['vahvistus'])
      const dateLens = R.lensProp('päivä')
      const childrenLens = R.lensProp('osasuoritukset')

      const topLevelRecords = R.compose(R.flatten, R.map(R.prop('suoritukset')))(koskiData.opiskeluoikeudet)

      const parseRecord = parseChildren => record => VerifiedEducation({
        placeOfStudy: R.view(placeOfStudyLens, record),
        uri: koulutusmoduuliTunnisteToCodeUri(R.view(identifierLens, record)),
        name: R.view(moduleNameLens, record),
        qualificationTitles: parseQualificationTitles(record),
        status: parseStatus(record),
        children: parseChildren(record)
      })

      const parseQualificationTitles = record => R.map(R.view(nameLens), R.view(qualificationTitlesLens, record))

      const parseStatus = record => {
        const confirmation = R.view(confirmationLens, record)
        return confirmation
          ? { completed: true, date: R.view(dateLens, confirmation) }
          : { completed: false }
      }

      const parseChildren = record => R.view(childrenLens, record)
        .map(unit => ({
          uri: tutkinnonosaTunnisteToCodeUri(R.view(identifierLens, unit)),
          name: R.view(moduleNameLens, unit)
        }))
        .filter(unit => !!unit.uri)

      return topLevelRecords.map(parseRecord(parseChildren))
    }

    return Promise.resolve(parseKoskiData(koskiData))
  },

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
