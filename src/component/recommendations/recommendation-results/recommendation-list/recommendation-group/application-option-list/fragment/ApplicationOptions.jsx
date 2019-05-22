import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { resolveApplicationStatus } from 'util/recommendationsHelper'
import useTranslation from 'component/generic/hook/useTranslation'
import ApplicationOption from './ApplicationOption'

const ApplicationOptionListStyle = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const ApplicationOptionListItemStyle = styled.li`
  margin: 0.5rem 0;
`

const ApplicationOptions = ({ options }) => {
  const t = useTranslation()
  return (
    <ApplicationOptionListStyle>
      {
        options.map(option => {
          const { id, providerName, type } = option
          const { message, parameter } = resolveApplicationStatus(option)
          const applicationStatus = t(message) + (parameter ? ` ${parameter}` : '')
          const link = `${process.env.RECOMMENDATION_CTA_BASE_URL}/${type.toLowerCase()}/${id}`

          return (
            <ApplicationOptionListItemStyle key={id}>
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
}

ApplicationOptions.propTypes = {
  options: PropTypes.array.isRequired
}

export default ApplicationOptions
