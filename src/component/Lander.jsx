import React, { useContext } from 'react'
import styled from 'styled-components'
import useTranslation from 'component/generic/hook/useTranslation'
import Box from 'component/generic/widget/Box'
import LinkButton from 'component/generic/widget/LinkButton'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import NameInput from 'component/login/NameInput'

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
  font-weight: 500;
`

const Brief = () => {
  const t = useTranslation()
  return (
    <BriefContainer>
      <h1>{t`Onko kiinnostavan opiskelupaikan etsiminen hankalaa?`}</h1>
      <p>{t`CompLeap auttaa sinua sopivan opiskelupaikan etsimisessä, sinun tarvitsee vain kertoa millaiset asiat sinua kiinnostavat ja mitä olet opiskellut tähän mennessä.`}</p>
      <p>{t`CompLeap pystyy käyttämään aiemmin tehtyjä opintojasi apuna sopivan opiskelupaikan etsimisessä.`}</p>
    </BriefContainer>
  )
}

const LoginPrompt = () => {
  const context$ = useContext(Context)
  const isLoggedIn = useObservable(context$, { path: ['context', 'user', 'isLoggedIn'] })
  const t = useTranslation()
  const loginButtonText = isLoggedIn ? t`Jatka profiiliisi` : t`Olen opiskellut tutkintoa Suomessa`

  return (
    <LoginContainer>
      {isLoggedIn && <LanderButton href='#profile'>{loginButtonText}</LanderButton>}
      {!isLoggedIn && <NameInput/>}
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
