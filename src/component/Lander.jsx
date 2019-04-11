import React, { useContext } from 'react'
import styled from 'styled-components'
import useTranslation from 'component/generic/hook/useTranslation'
import Box from 'component/generic/widget/Box'
import LinkButton from 'component/generic/widget/LinkButton'
import { Context, dispatch } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import { UserEvent } from 'state/events'
import { transition } from 'router/router'

const BriefContainer = styled.section`
  max-width: 600px;
  text-align: left;

  & h1 {
    font-size: 1.5rem;
  }

  & p {
    font-size: 1.1rem;
    line-height: 1.8em;
    font-weight: 300;
  }
`

const LoginContainer = styled.section`
  max-width: 600px;

  & h2 {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }

  & p {
    font-size: 0.9rem;
    line-height: 1.6em;
    font-weight: 300;
    text-align: left;
  }

  & > div {
    margin: 1rem 0;
  }
`

const LanderButton = styled(LinkButton)`
  padding: 1rem 2.5rem;
  text-transform: uppercase;
  font-weight: 500;
`

const Brief = () => {
  const t = useTranslation()
  return (
    <BriefContainer>
      <h1>{t`Onko kiinnostavan opiskelupaikan etsiminen hankalaa?`}</h1>
      <p>{t`CompLeap auttaa sinua sopivan opiskelupaikan etsimisessä, sinun tarvitsee vain kertoa millaiset asiat sinua kiinnostavat ja mitä olet opiskellut tähän mennessä.`}</p>
    </BriefContainer>
  )
}

const LoginPrompt = () => {
  const context$ = useContext(Context)
  const isLoggedIn = useObservable(context$, { path: ['context', 'user', 'isLoggedIn'] })
  const t = useTranslation()
  const loginButtonText = isLoggedIn ? t`Jatka profiiliisi` : t`Kirjaudu sisään`

  return (
    <LoginContainer>
      {!isLoggedIn && <h2>{t`Oletko valmis? Aloita kirjautumalla sisään!`}</h2>}
      <div>
        <LanderButton href='#profile'>{loginButtonText}</LanderButton>
      </div>
      {!isLoggedIn && (
        <React.Fragment>
          <div>
            <LinkButton
              type='text'
              href='#profile'
              onClick={event => {
                dispatch({ type: UserEvent.LOGIN, data: { id: null } })
                transition(event)
              }}
            >
              {t`Jatka kirjautumatta`}
            </LinkButton>
          </div>
          <p>{t`Kirjautumalla sisään CompLeap pystyy käyttämään Suomessa tehtyjä opintojasi apuna sopivan opiskelupaikan etsimisessä.`}</p>
        </React.Fragment>
      )}
    </LoginContainer>
  )
}

const Lander = () => (
  <Box align='center'>
    <Brief/>
    <LoginPrompt/>
  </Box>
)

Lander.displayName = 'Lander'

export default Lander
