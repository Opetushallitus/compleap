import React from 'react'
import EducationsList from 'component/educations/education-list/EducationsList'
import EducationPicker from 'component/educations/education-picker/EducationPicker'
import t from 'util/translate'
import { H1 } from 'ui/typography'

const Educations = () => (
  <React.Fragment>
    <H1>{t`Koulutukset`}</H1>
    <EducationsList/>
    <EducationPicker/>
  </React.Fragment>
)

export default Educations
