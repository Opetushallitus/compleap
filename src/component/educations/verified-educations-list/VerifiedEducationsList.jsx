import React, { useContext } from 'react'
import * as R from 'ramda'
import t from 'util/translate'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import { H2 } from 'ui/typography'
import Degree from 'component/educations/verified-educations-list/fragment/Degree'
import PlaceOfStudyHeader from 'component/educations/verified-educations-list/fragment/PlaceOfStudyHeader'
import Placeholder from 'component/educations/verified-educations-list/Placeholder'

const VerifiedEducationsList = () => {
  const context$ = useContext(Context)
  const status = useObservable(context$, { path: ['value', 'profile', 'education', 'verifiedEducation'] })
  const verifiedEducationsList = useObservable(context$, { path: ['context', 'education', 'data', 'verifiedEducations'] })

  if (status === 'pending') return <Placeholder/>
  if (status === 'failure') return <div>{'error'}</div>

  if (!verifiedEducationsList || verifiedEducationsList.length === 0) return null

  const groupedEducations = R.groupBy(education => t(education.placeOfStudy), verifiedEducationsList)

  return (
    <React.Fragment>
      <H2>{t`Suomalaiset tutkinnot`}</H2>
      <p>{t`Olemme tunnistaneet sinulta seuraavat koulutukset:`}</p>
      {Object.entries(groupedEducations).map(([place, educations]) => (
        <React.Fragment key={place}>
          <PlaceOfStudyHeader place={place}/>
          {educations.map(({ placeOfStudy, uri, children, ...rest }) =>
            <Degree key={uri} units={children} {...rest}/>
          )}
        </React.Fragment>
      ))}
    </React.Fragment>
  )
}

export default VerifiedEducationsList
