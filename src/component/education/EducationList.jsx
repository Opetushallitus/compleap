import React, { useContext } from 'react'
import educations from 'educations'
import educationClassification from 'finnishEducationClassification2016'
import { Context, dispatch } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import t from 'util/translate'
import Button from 'component/generic/widget/Button'
import { InteractionEvent } from 'state/events'

const EducationList = () => {
  const context$ = useContext(Context)
  const educationsList = useObservable(context$, { path: ['context', 'education', 'data', 'educations'] })

  return (
    educationsList && educationsList.map(({ id, level, specifier }) => (
      <div key={id}>
        {educations[level.id]}
        {specifier && ` (${educationClassification[specifier.id]})`}
        <Button type='text' onClick={() => dispatch({ type: InteractionEvent.REMOVE_EDUCATION, data: { level, specifier } })}>
          {t`Poista tutkinto`}
        </Button>
      </div>
    ))
  )
}

export default EducationList
