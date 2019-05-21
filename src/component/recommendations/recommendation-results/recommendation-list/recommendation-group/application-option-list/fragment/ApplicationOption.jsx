import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useTranslation from 'component/generic/hook/useTranslation'
import LinkButton from 'component/generic/widget/LinkButton'

const Container = styled.div`
  display: flex;
  align-items: center;
`

const Partial = styled.div`
  flex-basis: ${({ width }) => width};
`

const ApplicationOption = ({ organization, applicationStatus, readMoreLink }) => {
  const t = useTranslation()
  return (
    <Container>
      <Partial width='50%'>{organization}</Partial>
      <Partial width='30%'>{applicationStatus}</Partial>
      <Partial width='20%'><LinkButton href={readMoreLink} type='text'>{t`Lue lisää`}</LinkButton></Partial>
    </Container>
  )
}

ApplicationOption.propTypes = {
  organization: PropTypes.string.isRequired,
  applicationStatus: PropTypes.string.isRequired,
  readMoreLink: PropTypes.string.isRequired
}

export default ApplicationOption
