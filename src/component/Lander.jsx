import React from 'react'
import styled from 'styled-components'
import t from 'util/translate'
import Box from 'component/generic/widget/Box'
import LinkButton from 'component/generic/widget/LinkButton'

const TextContainer = styled.section`
  max-width: 500px;
  text-align: justify;
`

const Brief = () => (
  <TextContainer>
    <p>{t`Etsitkö sopivaa opiskelupaikkaa? CompLeap käyttää apuna kiinnostuksiasi ja jo tehtyjä opintojasi, suositellakseen juuri sinulle sopivimpia opiskelupaikkoja.`}</p>
    <p>{t`Kirjautumalla sisään CompLeap pystyy käyttämään Suomessa tehtyjä opintojasi apuna sopivan opiskelupaikan arvioimisessa.`}</p>
  </TextContainer>
)

const LoginPrompt = () => (
  <section>
    <LinkButton href='#profile'>{t`Kirjaudu sisään`}</LinkButton>
  </section>
)

const Lander = () => (
  <Box align='center'>
    <Brief/>
    <LoginPrompt/>
  </Box>
)

Lander.displayName = 'Lander'

export default Lander
