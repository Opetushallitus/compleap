import React from 'react'
import uuid from 'uuid/v4'
import { dispatch } from 'state/state'
import { UserEvent } from 'state/events'
import { transition } from 'router/router'
import t from 'util/translate'
import LinkButton from 'component/generic/widget/LinkButton'
import Box from 'component/generic/widget/Box'
import AuthIcon from 'resources/asset/auth.svg'

const Login = () => (
  <Box align='center'>
    <AuthIcon style={{
      width: '6rem',
      height: '6rem',
      margin: '2rem 2rem 2rem 3rem'
    }}/>
    <LinkButton
      href='#profile'
      onClick={event => {
        dispatch({ type: UserEvent.LOGIN, data: { id: uuid() } })
        transition(event)
      }}
    >
      {t`Jatka profiiliisi`}
    </LinkButton>
  </Box>
)

Login.displayName = 'Login'

export default Login
