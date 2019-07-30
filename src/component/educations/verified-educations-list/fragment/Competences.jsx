import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import qs from 'qs'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import Spinner from 'component/generic/widget/Spinner'
import Alert from 'component/generic/widget/Alert'
import useTranslation from 'component/generic/hook/useTranslation'

const getLabelMatchingLanguage = (concept, language) => {
  switch (language) {
    case 'fi':
      return concept.preferredLabelFi
    case 'en':
    default:
      return concept.preferredLabelEn
  }
}

const Competences = ({ educationUri }) => {
  const t = useTranslation()
  const context$ = useContext(Context)
  const lang = useObservable(context$, { path: ['context', 'user', 'language'] })
  const competences = useObservable(context$, { path: ['context', 'competences', 'data', 'fromVerifiedEducation', educationUri] }) || []
  const status = useObservable(context$, { path: ['value', 'profile', 'education', 'verifiedEducationCompetences'] })
  const uniqs = R.uniqBy(R.prop('conceptUri'), competences)

  if (status === 'pending') return <Spinner/>
  if (status === 'failure') return <Alert level='error'><p>{t`Tapahtui odottamaton virhe eikä kompetensseja pystytä juuri nyt näyttämään.`}</p></Alert>

  return (
    <ul>
      {
        uniqs.map(c => {
          const escoBaseUrl = `https://ec.europa.eu/esco/portal/skill`
          const escoParameters = qs.stringify({
            uri: c.conceptUri,
            conceptLanguage: lang
          })
          const escoLink = `${escoBaseUrl}?${escoParameters}`
          return (
            <li key={c.conceptUri}>
              <a href={escoLink} target='_blank' rel='noopener noreferrer'>
                {getLabelMatchingLanguage(c, lang)}
              </a>
            </li>
          )
        })
      }
    </ul>
  )
}

Competences.propTypes = {
  educationUri: PropTypes.string.isRequired
}

export default Competences
