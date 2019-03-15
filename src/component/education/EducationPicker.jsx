import React, { useContext } from 'react'
import educations from 'educations'
import { Context } from 'state/state'
import t from 'util/translate'
import { H2, H3 } from 'ui/typography'
import useObservable from 'component/generic/hook/useObservable'
import EducationLevelPicker from 'component/education/EducationLevelPicker'

const EducationPicker = () => {
  const context$ = useContext(Context)
  const selectionState = useObservable(context$, { path: ['value', 'profile', 'education', 'selected'] })
  const selectedId = useObservable(context$, { path: ['context', 'education', 'data', 'id'] })

  return (
    <React.Fragment>
      <H2>{t`Koulutukset`}</H2>
      <H3>{t`Olen suorittanut tutkinnon ulkomailla`}</H3>
      <p>{t`Minkä tasoisesta tutkinnosta on kyse?`}</p>
      <EducationLevelPicker
        options={Object.entries(educations)}
        selectedId={selectedId}
        requireSpecifier={selectionState === 'specifierRequired'}
      />
    </React.Fragment>
  )
}

export default EducationPicker
