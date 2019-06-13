import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'

const Competences = ({ educationUri }) => {
  const context$ = useContext(Context)
  const competences = useObservable(context$, { path: ['context', 'competences', 'data', educationUri] }) || []
  const uniqs = R.uniqBy(R.prop('conceptUri'), competences)

  return (
    <ul>
      {
        uniqs.map(c => (
          <li key={c.conceptUri}>
            <a href={c.conceptUri} target='_blank' rel='noopener noreferrer'>
              {c.preferredLabelFi}
            </a>
          </li>
        ))
      }
    </ul>
  )
}

Competences.propTypes = {
  educationUri: PropTypes.string.isRequired
}

export default Competences
