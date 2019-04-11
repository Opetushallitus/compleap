import React, { useContext } from 'react'
import * as R from 'ramda'
import uuid from 'uuid/v4'
import styled from 'styled-components'
import { Context, dispatch } from 'state/state'
import { UserEvent } from 'state/events'
import { transition } from 'router/router'
import useTranslation from 'component/generic/hook/useTranslation'
import LinkButton from 'component/generic/widget/LinkButton'
import Box from 'component/generic/widget/Box'
import AuthIcon from 'resources/asset/auth.svg'
import Select from 'component/generic/widget/dropdown/Select'
import useObservable from 'component/generic/hook/useObservable'
import { profileMapping } from 'resources/mock/koski/profiles'

const Contents = styled(Box)`
  & > * {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const SelectContainer = styled.div`
  width: 20rem;
  text-align: left;
`

const Login = () => {
  const context$ = useContext(Context)
  const t = useTranslation()
  const profileOptions = Object.entries(profileMapping)
    .map(([id, { description }]) => ({ id, label: description }))
    .map(R.over(R.lensProp('label'), t))
  const selectedProfileId = useObservable(context$, { path: ['context', 'user', 'profileId'] })

  return (
    <Contents align='center'>
      <AuthIcon style={{
        width: '6rem',
        height: '6rem'
      }}/>
      <SelectContainer>
        <Select
          placeholder={t`Valitse profiili`}
          options={profileOptions}
          onSelect={id => dispatch({ type: UserEvent.SELECT_PROFILE, data: { id } })}
          selectedId={selectedProfileId || ''}
        />
      </SelectContainer>
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
    </Contents>
  )
}

Login.displayName = 'Login'

export default Login
