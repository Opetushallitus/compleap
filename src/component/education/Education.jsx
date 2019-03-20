import React from 'react'
import EducationList from 'component/education/EducationList'
import EducationPicker from 'component/education/EducationPicker'
import t from 'util/translate'
import { H2 } from 'ui/typography'

const Education = () => (
  <React.Fragment>
    <H2>{t`Koulutukset`}</H2>
    <EducationList/>
    <EducationPicker/>
  </React.Fragment>
)

export default Education
