import React from 'react'
import PropTypes from 'prop-types'
import t from 'util/translate'

const Jobs = ({ jobs }) => (
  jobs && jobs.length > 0 && (
    <p>
      {t`Työpaikat` + ': ' + jobs.join(', ') + '.'}
    </p>
  )
)

Jobs.propTypes = {
  jobs: PropTypes.array
}

export default Jobs
