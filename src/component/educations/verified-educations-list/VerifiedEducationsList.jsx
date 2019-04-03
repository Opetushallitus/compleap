import React, { useContext } from 'react'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import Card from 'component/generic/widget/Card'

const VerifiedEducationsList = () => {
  const context$ = useContext(Context)
  const verifiedEducationsList = useObservable(context$, { path: ['context', 'education', 'data', 'verifiedEducations'] })

  if (!verifiedEducationsList) return null

  return verifiedEducationsList.map(({ id }) => (
    <Card key={id}>
      {'Education'}
    </Card>
  ))
}

export default VerifiedEducationsList
