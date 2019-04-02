import React, { useContext } from 'react'
import styled from 'styled-components'
import t from 'util/translate'
import Box from 'component/generic/widget/Box'
import LinkButton from 'component/generic/widget/LinkButton'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'

const TextContainer = styled.section`
  max-width: 600px;
  text-align: justify;
`

const LanderButton = styled(LinkButton)`
  padding: 1rem 2.5rem;
  text-transform: uppercase;
  font-weight: 500;
`

const LanderTextStyle = styled.p`
  font-size: 1.1rem;
  line-height: 1.8em;
  font-weight: 300;
`

const Brief = () => (
  <TextContainer>
    <LanderTextStyle>{t`Etsitkö sopivaa opiskelupaikkaa? CompLeap käyttää apuna kiinnostuksiasi ja jo tehtyjä opintojasi, suositellakseen juuri sinulle sopivimpia opiskelupaikkoja.`}</LanderTextStyle>
    <LanderTextStyle>{t`Kirjautumalla sisään CompLeap pystyy käyttämään Suomessa tehtyjä opintojasi apuna sopivan opiskelupaikan arvioimisessa.`}</LanderTextStyle>
  </TextContainer>
)

const LoginPrompt = () => {
  const context$ = useContext(Context)
  const isLoggedIn = useObservable(context$, { path: ['context', 'user', 'isLoggedIn'] })
  const buttonText = isLoggedIn ? t`Jatka profiiliisi` : t`Kirjaudu sisään`

  return (
    <section>
      <LanderButton href='#profile'>{buttonText}</LanderButton>
    </section>
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
