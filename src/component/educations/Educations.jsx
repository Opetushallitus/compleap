import React from 'react'
import VerifiedEducationsList from 'component/educations/verified-educations-list/VerifiedEducationsList'
import UnverifiedEducationsList from 'component/educations/unverified-educations-list/UnverifiedEducationsList'
import EducationPicker from 'component/educations/education-picker/EducationPicker'
import t from 'util/translate'
import { H1, H2 } from 'ui/typography'

const Educations = () => (
  <React.Fragment>
    <H1>{t`Koulutukset`}</H1>

    <H2>{t`Suomalaiset tutkinnot`}</H2>
    <VerifiedEducationsList/>

    <H2>{t`Ulkomailla suoritetut tutkinnot`}</H2>
    <UnverifiedEducationsList/>
    <EducationPicker/>
  </React.Fragment>
)

export default Educations
