import React, { useContext } from 'react'
import styled from 'styled-components'
import { Context, dispatch } from 'state/state'
import { UserEvent } from 'state/events'
import { PageState } from 'state/machine'
import Button from 'component/generic/widget/Button'
import useTranslation from 'component/generic/hook/useTranslation'
import useObservable from 'component/generic/hook/useObservable'
import ChangeableProfileImage from 'component/profile/fragment/ChangeableProfileImage'

const Container = styled.div`
  display: flex;
  flex-flow: column;
  padding: 1rem;
  min-width: 200px;
  min-height: 120px;
  align-items: center;
  justify-content: space-between;
`

const UserInfoContainer = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const ProfileContent = () => {
  const t = useTranslation()
  const context$ = useContext(Context)
  const isLoggingOut = useObservable(context$, { path: ['value'] }) === PageState.logout
  const name = useObservable(context$, { path: ['context', 'user', 'name'] })

  return (
    <Container>
      <UserInfoContainer>
        <ChangeableProfileImage/>
        {name}
      </UserInfoContainer>
      <Button
        type='secondary'
        onClick={() => dispatch(UserEvent.LOGOUT)}
        disabled={isLoggingOut}
      >
        {t`Kirjaudu ulos`}
      </Button>
    </Container>
  )
}

export default ProfileContent
