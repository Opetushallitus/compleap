import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import Spinner from 'component/generic/widget/Spinner'
import Alert from 'component/generic/widget/Alert'
import useTranslation from 'component/generic/hook/useTranslation'

const Competences = ({ educationUri }) => {
  const t = useTranslation()
  const context$ = useContext(Context)
  const competences = useObservable(context$, { path: ['context', 'competences', 'data', educationUri] }) || []
  const status = useObservable(context$, { path: ['value', 'profile', 'education', 'verifiedEducationCompetences'] })
  const uniqs = R.uniqBy(R.prop('conceptUri'), competences)

  if (status === 'pending') return <Spinner/>
  if (status === 'failure') return <Alert level='error'><p>{t`Tapahtui odottamaton virhe eikä kompetensseja pystytä juuri nyt näyttämään.`}</p></Alert>

  return (
    <ul>
      {
        uniqs.map(c => (
          <li key={c.conceptUri}>
            <a href={c.conceptUri} target='_blank' rel='noopener noreferrer'>
              {c.preferredLabelFi}
            </a>
          </li>
        ))
      }
    </ul>
  )
}

Competences.propTypes = {
  educationUri: PropTypes.string.isRequired
}

export default Competences
