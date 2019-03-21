import React from 'react'
import styled from 'styled-components'
import t from 'util/translate'
import LinkButton from 'component/generic/widget/LinkButton'

const Container = styled.div`
  max-width: ${props => props.theme.layout.maxContentWidth};
  margin: auto;
  text-align: center;
`

const Brief = () => (
  <section>
    <p>{t`Autamme sinua löytämään itsellesi sopivimman opiskelupaikan.`}</p>
    <p>{t`Käytämme tässä apuna kiinnostuksiasi ja jo tehtyjä opintojasi.`}</p>
  </section>
)

const LoginPrompt = () => (
  <section>
    <p>{t`Aloita kirjautumalla sisään:`}</p>
    <LinkButton href='#profile'>{t`Kirjaudu sisään`}</LinkButton>
    <p>{t`Saamme tällä tavoin tiedot Suomessa suorittamistasi opinnoista.`}</p>
  </section>
)

const Lander = () => (
  <Container>
    <Brief/>
    <LoginPrompt/>
  </Container>
)

Lander.displayName = 'Lander'

export default Lander
