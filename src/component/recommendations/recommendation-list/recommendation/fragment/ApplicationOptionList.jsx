import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as R from 'ramda'
import useTranslation from 'component/generic/hook/useTranslation'
import ApplicationOption from 'component/recommendations/recommendation-list/recommendation/fragment/ApplicationOption'
import Button from 'component/generic/widget/Button'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'

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

const NoResults = styled.div`
  background-color: ${({ theme }) => theme.color.negativeLightest};
  border: solid 1px ${({ theme }) => theme.color.negative};
  padding: 1rem;
  margin: 1rem 0;
`

const ApplicationOptionList = ({ options }) => {
  const [showAll, setShowAll] = useState(false)
  const t = useTranslation()
  const context$ = useContext(Context)
  const locationIdWhitelist = useObservable(context$, { path: ['context', 'recommendations', 'options', 'locations'] })
  const currentMatchingOptions = locationIdWhitelist.length > 0 ? options.filter(option => locationIdWhitelist.includes(option.region)) : options
  const optionsToShow = showAll ? currentMatchingOptions : R.take(TRUNCATED_LIST_LENGTH, currentMatchingOptions)

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
        currentMatchingOptions.length === 0 && (
          <NoResults>{t`Ei hakukohteita nykyisillä rajauksilla`}</NoResults>
        )
      }

      {
        currentMatchingOptions.length > TRUNCATED_LIST_LENGTH && (
          <ShowMoreButtonContainer>
            <Button type='text' onClick={() => setShowAll(!showAll)}>
              {
                showAll
                  ? t`Näytä vähemmän`
                  : t`Näytä loput` + ` ${currentMatchingOptions.length - TRUNCATED_LIST_LENGTH} ` + t`hakukohdetta`
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
