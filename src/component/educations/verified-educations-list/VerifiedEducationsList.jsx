import React, { useContext } from 'react'
import t from 'util/translate'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import Card from 'component/generic/widget/Card'
import { H2 } from 'ui/typography'

const VerifiedEducationsList = () => {
  const context$ = useContext(Context)
  const verifiedEducationsList = useObservable(context$, { path: ['context', 'education', 'data', 'verifiedEducations'] })

  if (!verifiedEducationsList) return null

  return (
    <React.Fragment>
      {verifiedEducationsList.length > 0 && <H2>{t`Suomalaiset tutkinnot`}</H2>}
      {verifiedEducationsList.map(({ id }) => (
        <Card key={id}>
          {'Education'}
        </Card>
      ))}
    </React.Fragment>
  )
}

export default VerifiedEducationsList
