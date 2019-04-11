import React from 'react'
import Disclaimer from 'component/generic/widget/Disclaimer'
import useTranslation from 'component/generic/hook/useTranslation'

const CertificateDisclaimer = () => {
  const t = useTranslation()
  return (
    <Disclaimer>
      <p>{t`Huomaa, että sinun on pyydettäessä pystyttävä näyttämään todistukset aikaisemmista opinnoistasi. Tällä tavoin varmistetaan, että pystyt oikeasti hakemaan haluamaasi koulutukseen.`}</p>
    </Disclaimer>
  )
}

export default CertificateDisclaimer
