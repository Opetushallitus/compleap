import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import competencesByUnit from 'resources/competencesByUnit'

const Competences = ({ unitUris = [] }) => {
  const pickMatchingCompetences = R.compose(
    R.uniq,
    R.map(R.prop('preferredLabel')),
    R.flatten,
    R.values,
    R.pickBy((v, k) => unitUris.includes(k))
  )

  return pickMatchingCompetences(competencesByUnit).map(v => <div key={v}>{v}</div>)
}

Competences.propTypes = {
  unitUris: PropTypes.array
}

export default Competences
