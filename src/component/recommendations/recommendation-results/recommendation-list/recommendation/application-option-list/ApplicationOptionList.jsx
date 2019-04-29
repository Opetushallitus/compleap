import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as R from 'ramda'
import useTranslation from 'component/generic/hook/useTranslation'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import ApplicationOption from './fragment/ApplicationOption'
import ShowMoreButton from './fragment/ShowMoreButton'

const TRUNCATED_LIST_LENGTH = 2

const ApplicationOptionListStyle = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const ApplicationOptionListItemStyle = styled.li`
  margin: 0.5rem 0;
`

const NoResults = styled.div`
  background-color: ${({ theme }) => theme.color.negativeLightest};
  border: solid 1px ${({ theme }) => theme.color.negative};
  padding: 1rem;
  margin: 1rem 0;
`

const applicationStatus = ({ applicationOnGoing, applicationStart }) => applicationOnGoing ? 'Haku käynnissä' : `Haku alkaa ${new Date(applicationStart)}`

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
          optionsToShow.map(recommendation => {
            const { document, providerName } = recommendation
            const link = '' // TODO Make url

            return (
              <ApplicationOptionListItemStyle key={document}>
                <ApplicationOption
                  organization={providerName}
                  applicationStatus={applicationStatus(recommendation)}
                  readMoreLink={link}
                />
              </ApplicationOptionListItemStyle>
            )
          })
        }
      </ApplicationOptionListStyle>

      {currentMatchingOptions.length === 0 && (
        <NoResults>{t`Ei hakukohteita nykyisillä rajauksilla`}</NoResults>
      )}

      {currentMatchingOptions.length > TRUNCATED_LIST_LENGTH && (
        <ShowMoreButton
          showAll={showAll}
          onClick={() => setShowAll(!showAll)}
          numRest={currentMatchingOptions.length - TRUNCATED_LIST_LENGTH}
        />
      )}
    </React.Fragment>
  )
}

ApplicationOptionList.propTypes = {
  options: PropTypes.array.isRequired
}

export default ApplicationOptionList
