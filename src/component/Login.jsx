import React from 'react'
import { dispatch } from 'state/state'
import { UserEvent } from 'state/events'
import { transition } from 'router/router'
import t from 'util/translate'
import LinkButton from 'component/generic/widget/LinkButton'
import Box from 'component/generic/widget/Box'

const Login = () => (
  <Box align='center'>
    <LinkButton
      href='#profile'
      onClick={event => {
        dispatch(UserEvent.LOGIN)
        transition(event)
      }}
    >
      {t`Jatka profiiliisi`}
    </LinkButton>
  </Box>
)

Login.displayName = 'Login'

export default Login
