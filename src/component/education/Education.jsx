import React from 'react'
import EducationList from 'component/education/EducationList'
import EducationPicker from 'component/education/EducationPicker'
import t from 'util/translate'
import { H1 } from 'ui/typography'

const Education = () => (
  <React.Fragment>
    <H1>{t`Koulutukset`}</H1>
    <EducationList/>
    <EducationPicker/>
  </React.Fragment>
)

export default Education
