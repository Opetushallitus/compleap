import React, { useContext } from 'react'
import educations from 'educations'
import educationClassification from 'finnishEducationClassification2016'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'

const makeKey = (level, specifier) => specifier ? `${level.id}_${specifier.id}` : level.id

const EducationList = () => {
  const context$ = useContext(Context)
  const educationsList = useObservable(context$, { path: ['context', 'education', 'data', 'educations'] })

  return (
    educationsList && educationsList.map(({ level, specifier }) => (
      <div key={makeKey(level, specifier)}>
        {educations[level.id]}
        {specifier && ` (${educationClassification[specifier.id]})`}
      </div>
    ))
  )
}

export default EducationList
