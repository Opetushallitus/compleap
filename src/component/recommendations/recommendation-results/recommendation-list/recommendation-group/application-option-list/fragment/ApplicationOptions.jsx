import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ApplicationOption from './ApplicationOption'

const ApplicationOptionListStyle = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const ApplicationOptionListItemStyle = styled.li`
  margin: 0.5rem 0;
`

const ApplicationOptions = ({ options }) => (
  <ApplicationOptionListStyle>
    {
      options.map(({ document, providerName, applicationOnGoing, applicationStart }) => {
        const applicationStatus = applicationOnGoing ? 'Haku käynnissä' : `Haku alkaa ${new Date(applicationStart)}`
        const link = '' // TODO Make url

        return (
          <ApplicationOptionListItemStyle key={document}>
            <ApplicationOption
              organization={providerName}
              applicationStatus={applicationStatus}
              readMoreLink={link}
            />
          </ApplicationOptionListItemStyle>
        )
      })
    }
  </ApplicationOptionListStyle>
)

ApplicationOptions.propTypes = {
  options: PropTypes.array.isRequired
}

export default ApplicationOptions
