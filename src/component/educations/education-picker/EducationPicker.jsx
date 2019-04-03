import React, { useContext } from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import educations from 'resources/educations'
import { Context, dispatch } from 'state/state'
import t from 'util/translate'
import { H2 } from 'ui/typography'
import useObservable from 'component/generic/hook/useObservable'
import EducationLevelPicker from 'component/educations/education-picker/fragment/EducationLevelPicker'
import Button from 'component/generic/widget/Button'
import { InteractionEvent } from 'state/events'
import { EducationPickerState } from 'state/educationStates'
import { padded, roundedRectangle, shadowed } from 'ui/properties'

const {
  formCollapsed,
  formOpen,
  selectionSet,
  specifierRequired,
  selectionReady
} = EducationPickerState

const EducationPickerStyle = styled.div`
  ${roundedRectangle};
  ${padded};
  ${shadowed};

  align-self: stretch;
  padding: 1.5rem 1rem;
`

const EducationPicker = () => {
  const context$ = useContext(Context)
  const isCollapsed = useObservable(context$, { path: ['value', 'profile', 'education'] }) === formCollapsed
  const selectionState = useObservable(context$, { path: ['value', 'profile', 'education', formOpen, selectionSet] })

  const selectedId = useObservable(context$, { path: ['context', 'education', 'data', 'selection', 'level', 'id'] })
  const selectedSpecifierId = useObservable(context$, { path: ['context', 'education', 'data', 'selection', 'specifier', 'id'] })
  const addedUnverifiedEducations = useObservable(context$, { path: ['context', 'education', 'data', 'unverifiedEducations'] })

  const hasSpecifier = !!selectedSpecifierId
  const addedEducationSpecifierIds = addedUnverifiedEducations.map(R.view(R.lensPath(['specifier', 'id']))).filter(v => !!v)

  if (isCollapsed) {
    return (
      <Button type='secondary' onClick={() => dispatch(InteractionEvent.BEGIN_EDUCATION_INPUT)}>
        {t`Lisää muualla kuin Suomessa suoritettu tutkinto`}
      </Button>
    )
  }

  return (
    <EducationPickerStyle>
      <H2>{t`Olen suorittanut tutkinnon ulkomailla`}</H2>
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
    </EducationPickerStyle>
  )
}

export default EducationPicker
