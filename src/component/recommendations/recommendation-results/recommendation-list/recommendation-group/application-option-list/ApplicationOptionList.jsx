import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as R from 'ramda'
import useTranslation from 'component/generic/hook/useTranslation'
import ApplicationOptions from './fragment/ApplicationOptions'
import ShowMoreButton from './fragment/ShowMoreButton'

const TRUNCATED_LIST_LENGTH = 2

const NoResults = styled.div`
  background-color: ${({ theme }) => theme.color.negativeLightest};
  border: solid 1px ${({ theme }) => theme.color.negative};
  padding: 1rem;
  margin: 1rem 0;
`

const ApplicationOptionList = ({ options }) => {
  const t = useTranslation()
  const [showAll, setShowAll] = useState(false)
  const optionsToShow = showAll ? options : R.take(TRUNCATED_LIST_LENGTH, options)

  return (
    <React.Fragment>
      <ApplicationOptions options={optionsToShow}/>

      {options.length === 0 && (
        <NoResults>{t`Ei hakukohteita nykyisillä rajauksilla`}</NoResults>
      )}

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
