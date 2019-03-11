import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Interest from 'component/interests/Interest'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'

const Interests = () => {
  const context$ = useContext(Context)
  const status = useObservable(context$, { path: ['value', 'profile', 'interests'] })
  const interests = useObservable(context$, { path: ['context', 'interests', 'data'] })

  if (status === 'pending') return <div>{'loading'}</div>
  if (status === 'failure') return <div>{'error'}</div>

  return (
    <ul>
      {interests.map(v => (
        <li key={v.topic}>
          <Interest interest={v}/>
        </li>
      ))}
    </ul>
  )
}

Interests.propTypes = {
  initialSuggestions: PropTypes.object
}

export default Interests
