import React, { useContext } from 'react'
import educations from 'educations'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import EducationPicker from 'component/education/EducationPicker'

const Education = () => {
  const context$ = useContext(Context)
  const status = useObservable(context$, { path: ['value', 'profile', 'education'] })
  const selectedEducation = useObservable(context$, { path: ['context', 'education', 'data'] })

  if (status === 'empty') return <EducationPicker/>

  return (
    <div>{educations[selectedEducation.id]}</div>
  )
}

export default Education
