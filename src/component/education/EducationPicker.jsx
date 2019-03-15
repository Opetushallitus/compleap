import React, { useContext } from 'react'
import educations from 'educations'
import { Context, dispatch } from 'state/state'
import t from 'util/translate'
import { H2, H3 } from 'ui/typography'
import useObservable from 'component/generic/hook/useObservable'
import EducationLevelPicker from 'component/education/EducationLevelPicker'
import Button from 'component/generic/widget/Button'
import { InteractionEvent } from 'state/events'

const EducationPicker = () => {
  const context$ = useContext(Context)
  const selectionState = useObservable(context$, { path: ['value', 'profile', 'education', 'open', 'selected'] })
  const selectedId = useObservable(context$, { path: ['context', 'education', 'data', 'id'] })
  const isCollapsed = useObservable(context$, { path: ['value', 'profile', 'education'] }) === 'collapsed'

  if (isCollapsed) {
    return (
      <Button onClick={() => dispatch(InteractionEvent.ENTER_EDUCATION)}>
        {t`Lisää muualla kuin Suomessa suoritettu tutkinto`}
      </Button>
    )
  }

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
      <Button onClick={() => dispatch(InteractionEvent.CANCEL_EDUCATION)}>
        {t`Peruuta`}
      </Button>
      <Button onClick={() => dispatch(InteractionEvent.CONFIRM_EDUCATION)} disabled={selectionState !== 'ready'}>
        {t`Valmis`}
      </Button>
    </React.Fragment>
  )
}

export default EducationPicker
