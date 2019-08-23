import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import Spinner from 'component/generic/widget/Spinner'
import Alert from 'component/generic/widget/Alert'
import useTranslation from 'component/generic/hook/useTranslation'
import CompetenceList from 'component/educations/competence-list/CompetenceList'

const Competences = ({ educationUri }) => {
  const t = useTranslation()
  const context$ = useContext(Context)
  const competences = useObservable(context$, { path: ['context', 'competences', 'data', 'fromVerifiedEducation', educationUri] }) || []
  const status = useObservable(context$, { path: ['value', 'profile', 'education', 'verifiedEducationCompetences'] })
  const uniqs = R.uniqBy(R.prop('conceptUri'), competences)

  if (status === 'pending') return <Spinner/>
  if (status === 'failure') return <Alert level='error'><p>{t`Tapahtui odottamaton virhe eikä kompetensseja pystytä juuri nyt näyttämään.`}</p></Alert>

  return (
    <>
      <p>{t`Tämän tutkinnon opinnoista sinulle on kertynyt seuraavanlaista osaamista`}</p>
      <CompetenceList competences={uniqs}/>
    </>
  )
}

Competences.propTypes = {
  educationUri: PropTypes.string.isRequired
}

export default Competences
