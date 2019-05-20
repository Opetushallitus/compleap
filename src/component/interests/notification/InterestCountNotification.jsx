import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import { ref } from 'util/proptype'
import Message from './fragment/Message'
import GotoRecommendationsButton from './fragment/GotoRecommendationsButton'

const ButtonContainer = styled.div`
  margin-top: 0.5rem;
`

const PosedMessage = posed(Message)({
  enter: { opacity: 1 },
  exit: { opacity: 0 },
  flip: {
    transition: {
      type: 'tween',
      duration: 300
    }
  }
})

const PosedButton = posed(ButtonContainer)({
  enter: { opacity: 1, y: '0%', delay: 200 },
  exit: { opacity: 0, y: '100%' }
})

const InterestCountNotification = ({ numSelectedInterests, container }) => {
  const hasRequiredInterests = numSelectedInterests >= process.env.MIN_INTERESTS
  const hasTooManyInterests = numSelectedInterests > process.env.MAX_INTERESTS
  const containerRect = container.current.getBoundingClientRect()
  const nextSectionY = containerRect.y + window.scrollY + containerRect.height + 50

  return (
    <React.Fragment>
      <PoseGroup flipMove={true}>
        <PosedMessage
          key='message'
          numSelectedInterests={numSelectedInterests}
          hasRequiredInterests={hasRequiredInterests}
          hasTooManyInterests={hasTooManyInterests}
        />
        {hasRequiredInterests && (
          <PosedButton key='button'>
            <GotoRecommendationsButton posY={nextSectionY}/>
          </PosedButton>
        )}
      </PoseGroup>
    </React.Fragment>
  )
}

InterestCountNotification.propTypes = {
  numSelectedInterests: PropTypes.number.isRequired,
  container: ref.isRequired
}

export default InterestCountNotification
