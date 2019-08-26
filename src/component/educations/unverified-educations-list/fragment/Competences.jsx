import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import useTranslation from 'component/generic/hook/useTranslation'
import CompetenceList from 'component/educations/competence-list/CompetenceList'
import Placeholder from 'component/educations/competence-list/Placeholder'

const Competences = ({ educationUri }) => {
  const t = useTranslation()
  const context$ = useContext(Context)
  const competences = useObservable(context$, { path: ['context', 'competences', 'data', 'fromUnverifiedEducation', educationUri] })
  const isDataPending = competences === undefined

  if (isDataPending) return <Placeholder/>

  const uniqs = R.uniqBy(R.prop('conceptUri'), competences)
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
