import React, { useContext } from 'react'
import styled, { css } from 'styled-components'
import { Context, dispatch } from 'state/state'
import { UserEvent } from 'state/events'
import { transition } from 'router/router'
import Button from 'component/generic/widget/Button'
import useTranslation from 'component/generic/hook/useTranslation'
import LinkButton from 'component/generic/widget/LinkButton'
import InputLabel from 'component/login/fragment/InputLabel'
import { H1 } from 'ui/typography'
import useObservable from 'component/generic/hook/useObservable'

const largeButton = css`
  padding: 1rem 2.5rem;
  font-weight: 500;
`

const LargeButton = styled(Button)`
  ${largeButton};
`

const LargeLinkButton = styled(LinkButton)`
  ${largeButton};
`

const BackgroundSelection = () => {
  const t = useTranslation()
  const context$ = useContext(Context)
  const name = useObservable(context$, { path: ['context', 'user', 'name'] })

  return (
    <>
      <H1>{t`Moikka` + ` ${name}!`}</H1>
      <InputLabel>{t`Valitse seuraavaksi taustasi`}</InputLabel>
      <div>
        <LargeButton onClick={() => dispatch(UserEvent.SELECT_BACKGROUND)}>
          {t`Olen opiskellut tutkintoa Suomessa`}
        </LargeButton>
      </div>
      <div>
        <LargeLinkButton
          href='#profile'
          onClick={event => {
            dispatch({ type: UserEvent.LOGIN, data: { id: null } })
            transition(event)
          }}
        >
          {t`En ole opiskellut tutkintoa Suomessa`}
        </LargeLinkButton>
      </div>
    </>
  )
}

export default BackgroundSelection
