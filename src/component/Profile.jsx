import React, { useContext } from 'react'
import t from 'util/translate'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import { H1 } from 'ui/typography'

const Data = () => {
  const context$ = useContext(Context)
  const status = useObservable(context$, { path: ['value', 'profile', 'interests'] })
  const interestSuggestions = useObservable(context$, { path: ['context', 'interests', 'suggestions', 'data'] })

  if (status === 'pending') return <div>{'loading'}</div>
  if (status === 'failure') return <div>{'error'}</div>

  return (
    <ul>
      {interestSuggestions && interestSuggestions.map(i => <li key={i}>{i}</li>)}
    </ul>
  )
}

const Profile = () => (
  <div>
    <H1>
      {t`CompLeap`}
    </H1>
    <Data/>
  </div>
)

Profile.displayName = 'Profile'

export default Profile
