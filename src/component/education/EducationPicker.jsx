import React, { useContext } from 'react'
import * as R from 'ramda'
import educations from 'educations'
import { Context, dispatch } from 'state/state'
import t from 'util/translate'
import { H3 } from 'ui/typography'
import useObservable from 'component/generic/hook/useObservable'
import EducationLevelPicker from 'component/education/EducationLevelPicker'
import Button from 'component/generic/widget/Button'
import { InteractionEvent } from 'state/events'
import { EducationPickerState } from 'state/educationStates'

const {
  formCollapsed,
  formOpen,
  selectionSet,
  specifierRequired,
  selectionReady
} = EducationPickerState

const EducationPicker = () => {
  const context$ = useContext(Context)
  const isCollapsed = useObservable(context$, { path: ['value', 'profile', 'education'] }) === formCollapsed
  const selectionState = useObservable(context$, { path: ['value', 'profile', 'education', formOpen, selectionSet] })

  const selectedId = useObservable(context$, { path: ['context', 'education', 'data', 'selection', 'level', 'id'] })
  const selectedSpecifierId = useObservable(context$, { path: ['context', 'education', 'data', 'selection', 'specifier', 'id'] })
  const addedEducations = useObservable(context$, { path: ['context', 'education', 'data', 'educations'] })

  const hasSpecifier = !!selectedSpecifierId
  const addedEducationSpecifierIds = addedEducations.map(R.view(R.lensPath(['specifier', 'id']))).filter(v => !!v)

  if (isCollapsed) {
    return (
      <Button type='secondary' onClick={() => dispatch(InteractionEvent.BEGIN_EDUCATION_INPUT)}>
        {t`Lisää muualla kuin Suomessa suoritettu tutkinto`}
      </Button>
    )
  }

  return (
    <React.Fragment>
      <H3>{t`Olen suorittanut tutkinnon ulkomailla`}</H3>
      <p>{t`Minkä tasoisesta tutkinnosta on kyse?`}</p>
      <EducationLevelPicker
        options={Object.entries(educations)}
        selectedId={selectedId}
        selectedSpecifierId={selectedSpecifierId}
        addedSpecifierIds={addedEducationSpecifierIds}
        showSpecifierPicker={selectionState === specifierRequired || hasSpecifier}
      />
      <Button type='text' onClick={() => dispatch(InteractionEvent.CANCEL_EDUCATION)}>
        {t`Peruuta`}
      </Button>
      <Button onClick={() => dispatch(InteractionEvent.CONFIRM_EDUCATION)} disabled={selectionState !== selectionReady}>
        {t`Valmis`}
      </Button>
    </React.Fragment>
  )
}

export default EducationPicker
