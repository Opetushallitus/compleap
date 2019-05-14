import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Message from './fragment/Message'
import GotoRecommendationsButton from './fragment/GotoRecommendationsButton'

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
