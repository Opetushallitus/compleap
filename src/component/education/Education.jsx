import React, { useContext } from 'react'
import educations from 'educations'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import EducationPicker from 'component/education/EducationPicker'

const Education = () => {
  const context$ = useContext(Context)
  const status = useObservable(context$, { path: ['value', 'profile', 'education'] })
  const educationsList = useObservable(context$, { path: ['context', 'education', 'data', 'educations'] })

  if (status !== 'done') return <EducationPicker/>

  return (
    <React.Fragment>
      {
        educationsList.map(education => (
          <div key={education.id}>{educations[education.id]}</div>
        ))
      }
      <EducationPicker/>
    </React.Fragment>
  )
}

export default Education
