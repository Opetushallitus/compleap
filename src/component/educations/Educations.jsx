import React from 'react'
import VerifiedEducationsList from 'component/educations/verified-educations-list/VerifiedEducationsList'
import UnverifiedEducationsList from 'component/educations/unverified-educations-list/UnverifiedEducationsList'
import EducationPicker from 'component/educations/education-picker/EducationPicker'
import useTranslation from 'component/generic/hook/useTranslation'
import { H1 } from 'ui/typography'

const Educations = () => {
  const t = useTranslation()
  return (
    <React.Fragment>
      <H1>{t`Koulutukset`}</H1>
      <VerifiedEducationsList/>
      <UnverifiedEducationsList/>
      <EducationPicker/>
    </React.Fragment>
  )
}

export default Educations
