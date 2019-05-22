import React, { useState } from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import Header from './fragment/Header'
import ApplicationOptions from './fragment/ApplicationOptions'
import ShowMoreButton from './fragment/ShowMoreButton'

const TRUNCATED_LIST_LENGTH = 10

const ApplicationOptionList = ({ options }) => {
  const [showAll, setShowAll] = useState(false)
  const optionsToShow = showAll ? options : R.take(TRUNCATED_LIST_LENGTH, options)

  return (
    <React.Fragment>
      <Header numOptions={options.length}/>
      <ApplicationOptions options={optionsToShow}/>

      {options.length > TRUNCATED_LIST_LENGTH && (
        <ShowMoreButton
          showAll={showAll}
          onClick={() => setShowAll(!showAll)}
          numRest={options.length - TRUNCATED_LIST_LENGTH}
        />
      )}
    </React.Fragment>
  )
}

ApplicationOptionList.propTypes = {
  options: PropTypes.array.isRequired
}

export default ApplicationOptionList
