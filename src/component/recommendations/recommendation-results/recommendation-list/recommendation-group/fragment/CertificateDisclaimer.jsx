import React from 'react'
import Alert from 'component/generic/widget/Alert'
import useTranslation from 'component/generic/hook/useTranslation'

const CertificateDisclaimer = () => {
  const t = useTranslation()
  return (
    <Alert>
      <p>{t`Huomaa, että sinun on pyydettäessä pystyttävä näyttämään todistukset aikaisemmista opinnoistasi. Tällä tavoin varmistetaan, että pystyt oikeasti hakemaan haluamaasi koulutukseen.`}</p>
    </Alert>
  )
}

export default CertificateDisclaimer
