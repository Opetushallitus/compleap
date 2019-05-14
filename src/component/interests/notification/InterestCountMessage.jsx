import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useTranslation from 'component/generic/hook/useTranslation'
import Button from 'component/generic/widget/Button'

const Message = ({ numSelectedInterests, hasRequiredInterests, hasTooManyInterests }) => {
  const t = useTranslation()

  return (
    <div>
      {t`Kiinnostuksia valittu`}
      {' '}
      {`${numSelectedInterests} / ${process.env.MIN_INTERESTS}`}
      {
        hasTooManyInterests
          ? t`– suositukset ovat epätarkkoja, jos kiinnostuksia on valittu yli` + ' ' + process.env.MAX_INTERESTS
          : hasRequiredInterests && t` – voit jatkaa kiinnostusten lisäämistä, tämä tarkentaa suosituksia`
      }
    </div>
  )
}

Message.propTypes = {
  numSelectedInterests: PropTypes.number.isRequired,
  hasRequiredInterests: PropTypes.bool.isRequired,
  hasTooManyInterests: PropTypes.bool.isRequired
}

const GotoRecommendationsButton = () => {
  const t = useTranslation()
  return <Button onClick={() => {}}>{t`Näytä suositukset`}</Button>
}

const ButtonContainer = styled.div`
  margin-top: 0.5rem;
`

const InterestCountMessage = ({ numSelectedInterests }) => {
  const hasRequiredInterests = numSelectedInterests >= process.env.MIN_INTERESTS
  const hasTooManyInterests = numSelectedInterests > process.env.MAX_INTERESTS

  return (
    <React.Fragment>
      <Message
        numSelectedInterests={numSelectedInterests}
        hasRequiredInterests={hasRequiredInterests}
        hasTooManyInterests={hasTooManyInterests}
      />
      {hasRequiredInterests && <ButtonContainer><GotoRecommendationsButton/></ButtonContainer>}
    </React.Fragment>
  )
}

InterestCountMessage.propTypes = {
  numSelectedInterests: PropTypes.number.isRequired
}

export default InterestCountMessage
