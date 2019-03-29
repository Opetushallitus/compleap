import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as R from 'ramda'
import t from 'util/translate'
import ApplicationOption from 'component/recommendations/recommendation-list/recommendation/fragment/ApplicationOption'
import Button from 'component/generic/widget/Button'

const TRUNCATED_LIST_LENGTH = 2

const ApplicationOptionListStyle = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const ApplicationOptionListItemStyle = styled.li`
  margin: 0.5rem 0;
`

const ShowMoreButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`

const ApplicationOptionList = ({ options }) => {
  const [showAll, setShowAll] = useState(false)
  const optionsToShow = showAll ? options : R.take(TRUNCATED_LIST_LENGTH, options)

  return (
    <React.Fragment>
      <ApplicationOptionListStyle>
        {
          optionsToShow.map(({ id, organization, applicationStatus, readMoreLink }) => (
            <ApplicationOptionListItemStyle key={id}>
              <ApplicationOption
                organization={organization}
                applicationStatus={applicationStatus}
                readMoreLink={readMoreLink}
              />
            </ApplicationOptionListItemStyle>
          ))
        }
      </ApplicationOptionListStyle>

      {
        options.length > TRUNCATED_LIST_LENGTH && (
          <ShowMoreButtonContainer>
            <Button type='text' onClick={() => setShowAll(!showAll)}>
              {
                showAll
                  ? t`Näytä vähemmän`
                  : t`Näytä loput` + ` ${options.length - TRUNCATED_LIST_LENGTH} ` + t`hakukohdetta`
              }
            </Button>
          </ShowMoreButtonContainer>
        )
      }
    </React.Fragment>
  )
}

ApplicationOptionList.propTypes = {
  options: PropTypes.array.isRequired
}

export default ApplicationOptionList
