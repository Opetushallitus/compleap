import React from 'react'
import t from 'util/translate'

const Brief = () => (
  <section>
    <h1>{t`CompLeap`}</h1>
    <p>{t`Autamme sinua löytämään itsellesi sopivimman opiskelupaikan.`}</p>
    <p>{t`Käytämme tässä apuna kiinnostuksiasi ja jo tehtyjä opintojasi.`}</p>
  </section>
)

const LoginPrompt = () => (
  <section>
    <p>{t`Aloita kirjautumalla sisään:`}</p>
    <button>{t`Kirjaudu sisään`}</button>
    <p>{t`Saamme tällä tavoin tiedot Suomessa suorittamistasi opinnoista.`}</p>
  </section>
)

const Lander = () => (
  <main>
    <Brief/>
    <LoginPrompt/>
  </main>
)

export default Lander
