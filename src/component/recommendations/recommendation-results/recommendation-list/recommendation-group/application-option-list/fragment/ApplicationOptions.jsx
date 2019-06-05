import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Context } from 'state/state'
import { resolveApplicationStatus } from 'util/recommendationsHelper'
import { children } from 'util/proptype'
import useTranslation from 'component/generic/hook/useTranslation'
import useObservable from 'component/generic/hook/useObservable'
import ApplicationOption from './ApplicationOption'

const ApplicationOptionListStyle = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`

const ApplicationOptionListItemStyle = styled.li`
  margin: 0.5rem 0;
`

const withStatusFormatting = message => {
  return function StatusFormatting (Text) {
    const Bold = ({ children }) => <b>{children}</b>
    const Normal = ({ children }) => <span>{children}</span>

    Bold.propTypes = { children }
    Normal.propTypes = { children }

    const Wrapper = message === 'Haku käynnissä' ? Bold : Normal
    return <Wrapper><Text/></Wrapper>
  }
}

const ApplicationOptions = ({ options }) => {
  const t = useTranslation()
  const context$ = useContext(Context)
  const lang = useObservable(context$, { path: ['context', 'user', 'language'] })
  const locale = lang === 'fi' ? 'fi-FI' : 'en-GB'

  return (
    <ApplicationOptionListStyle>
      {
        options.map(option => {
          const { id, providerName, type } = option
          const { message, parameter } = resolveApplicationStatus(option)
          const date = parameter && parameter.toLocaleDateString(locale, {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
          })
          const ApplicationStatus = () => <span>{t(message) + (date ? ` ${date}` : '')}</span>
          const link = `${process.env.RECOMMENDATION_CTA_BASE_URL}/${type.toLowerCase()}/${id}`

          return (
            <ApplicationOptionListItemStyle key={id}>
              <ApplicationOption
                organization={providerName}
                applicationStatus={withStatusFormatting(message)(ApplicationStatus)}
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
