import React from 'react'
import t from 'util/translate'
import Box from 'component/generic/widget/Box'
import LinkButton from 'component/generic/widget/LinkButton'

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
  <Box align='center'>
    <Brief/>
    <LoginPrompt/>
  </Box>
)

Lander.displayName = 'Lander'

export default Lander
