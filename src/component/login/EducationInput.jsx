import React, { useContext } from 'react'
import { Context, dispatch } from 'state/state'
import { UserEvent } from 'state/events'
import useTranslation from 'component/generic/hook/useTranslation'
import Select from 'component/generic/widget/dropdown/Select'
import { profileMapping } from 'resources/mock/koski/profiles'
import * as R from 'ramda'
import useObservable from 'component/generic/hook/useObservable'
import LinkButton from 'component/generic/widget/LinkButton'
import uuid from 'uuid/v4'
import { transition } from 'router/router'
import InputContainer from './fragment/InputContainer'
import InputLabel from 'component/login/fragment/InputLabel'
import EducationIcon from 'resources/asset/education.svg'

const EducationInput = () => {
  const t = useTranslation()
  const context$ = useContext(Context)

  const profileOptions = Object.entries(profileMapping)
    .map(([id, { description }]) => ({ id, label: description }))
    .map(R.over(R.lensProp('label'), t))
  const selectedProfileId = useObservable(context$, { path: ['context', 'user', 'profileId'] })

  return (
    <>
      <EducationIcon style={{
        width: '6rem',
        height: '6rem'
      }}/>
      <InputLabel>
        {t`Valitse pohjakoulutuksesi`}
      </InputLabel>
      <InputContainer>
        <Select
          placeholder={t`Valitse pohjakoulutus`}
          options={profileOptions}
          onSelect={id => dispatch({ type: UserEvent.SELECT_PROFILE, data: { id } })}
          selectedId={selectedProfileId || ''}
        />
      </InputContainer>
      <LinkButton
        href='#profile'
        disabled={!selectedProfileId}
        onClick={event => {
          dispatch({ type: UserEvent.LOGIN, data: { id: uuid() } })
          transition(event)
        }}
      >
        {t`Jatka profiiliisi`}
      </LinkButton>
    </>
  )
}

export default EducationInput
