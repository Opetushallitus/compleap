import React from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'component/generic/hook/useTranslation'

const Jobs = ({ jobs }) => {
  const t = useTranslation()
  return (
    jobs && jobs.length > 0 && (
      <p>
        {t`Työpaikat` + ': ' + jobs.join(', ') + '.'}
      </p>
    )
  )
}

Jobs.propTypes = {
  jobs: PropTypes.array
}

export default Jobs
