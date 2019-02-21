import React from 'react'
import styled from 'styled-components'
import t from 'util/translate'
import { H1 } from 'ui/typography'
import Button from 'component/generic/widget/Button'

const Container = styled.main`
  max-width: ${props => props.theme.layout.maxContentWidth};
  margin: auto;
  text-align: center;
`

const Brief = () => (
  <section>
    <H1>{t`CompLeap`}</H1>
    <p>{t`Autamme sinua löytämään itsellesi sopivimman opiskelupaikan.`}</p>
    <p>{t`Käytämme tässä apuna kiinnostuksiasi ja jo tehtyjä opintojasi.`}</p>
  </section>
)

const LoginPrompt = () => (
  <section>
    <p>{t`Aloita kirjautumalla sisään:`}</p>
    <Button onClick={() => console.warn('Not implemented')}>{t`Kirjaudu sisään`}</Button>
    <p>{t`Saamme tällä tavoin tiedot Suomessa suorittamistasi opinnoista.`}</p>
  </section>
)

const Lander = () => (
  <Container>
    <Brief/>
    <LoginPrompt/>
  </Container>
)

export default Lander
