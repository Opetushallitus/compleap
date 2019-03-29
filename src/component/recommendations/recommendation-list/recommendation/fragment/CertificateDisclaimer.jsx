import React from 'react'
import Disclaimer from 'component/generic/widget/Disclaimer'
import t from 'util/translate'

const CertificateDisclaimer = () =>
  <Disclaimer>
    <p>{t`Huomaa, että sinun on pyydettäessä pystyttävä näyttämään todistukset aikaisemmista opinnoistasi. Tällä tavoin varmistetaan, että pystyt oikeasti hakemaan haluamaasi koulutukseen.`}</p>
  </Disclaimer>

export default CertificateDisclaimer
