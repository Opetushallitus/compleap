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

const GotoRecommendationsButton = ({ posY }) => {
  const t = useTranslation()
  const goto = () => {
    window.scrollTo({
      top: posY,
      behavior: 'smooth'
    })
  }
  return <Button onClick={goto}>{t`Näytä suositukset`}</Button>
}

GotoRecommendationsButton.propTypes = {
  posY: PropTypes.number.isRequired
}

const ButtonContainer = styled.div`
  margin-top: 0.5rem;
`

const InterestCountNotification = ({ numSelectedInterests, container }) => {
  const hasRequiredInterests = numSelectedInterests >= process.env.MIN_INTERESTS
  const hasTooManyInterests = numSelectedInterests > process.env.MAX_INTERESTS
  const containerRect = container.current.getBoundingClientRect()
  const nextSectionY = containerRect.y + window.scrollY + containerRect.height + 50

  return (
    <React.Fragment>
      <Message
        numSelectedInterests={numSelectedInterests}
        hasRequiredInterests={hasRequiredInterests}
        hasTooManyInterests={hasTooManyInterests}
      />
      {hasRequiredInterests && (
        <ButtonContainer>
          <GotoRecommendationsButton posY={nextSectionY}/>
        </ButtonContainer>
      )}
    </React.Fragment>
  )
}

InterestCountNotification.propTypes = {
  numSelectedInterests: PropTypes.number.isRequired,
  container: PropTypes.node.isRequired
}

export default InterestCountNotification
