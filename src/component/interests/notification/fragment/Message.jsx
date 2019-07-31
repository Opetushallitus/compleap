import React, { forwardRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import posed from 'react-pose'
import useTranslation from 'component/generic/hook/useTranslation'

const AnimationDuration = 200

const CountText = styled.p`
  font-size: ${({ theme, hasRequiredInterests }) => hasRequiredInterests ? theme.font.size.m : theme.font.size.l};
  font-weight: 300;
  margin: 0;
`

const ExplanationText = styled.p`
  font-weight: 300;
  margin: 0;
`

const Count = styled.span`
  display: inline-block;
`

const PosedCount = posed(Count)({
  idle: {
    transform: 'scale(1.0)',
    transition: {
      duration: AnimationDuration
    }
  },
  active: {
    transform: 'scale(1.3)',
    transition: {
      duration: AnimationDuration
    }
  }
})

// eslint-disable-next-line react/display-name
const Message = forwardRef(function message ({ numSelectedInterests, hasRequiredInterests, hasMaximumInterests, hasTooManyInterests }, ref) {
  const t = useTranslation()
  const [counterState, setCounterState] = useState('idle')
  const [animationTimer, setAnimationTimer] = useState(null)

  useEffect(() => {
    clearTimeout(animationTimer)
    setCounterState('active')
    setAnimationTimer(setTimeout(() => { setCounterState('idle') }, AnimationDuration))
  }, [numSelectedInterests])

  return (
    <div ref={ref}>
      <CountText hasRequiredInterests={hasRequiredInterests}>
        {t`Kiinnostuksia valittu`}
        {' '}
        <PosedCount key={numSelectedInterests} pose={counterState}>{numSelectedInterests}</PosedCount>
        {` / ${process.env.MIN_INTERESTS} `}
      </CountText>
      <ExplanationText>
        {
          hasMaximumInterests
            ? null
            : hasTooManyInterests
              ? t`Suositukset ovat epätarkkoja, jos yli` + ' ' + process.env.MAX_INTERESTS + ' ' + t`kiinnostusta on valittu`
              : hasRequiredInterests && (' ' + t`Voit jatkaa kiinnostusten lisäämistä, tämä tarkentaa suosituksia`)
        }
      </ExplanationText>
    </div>
  )
})

Message.propTypes = {
  numSelectedInterests: PropTypes.number.isRequired,
  hasRequiredInterests: PropTypes.bool.isRequired,
  hasMaximumInterests: PropTypes.bool.isRequired,
  hasTooManyInterests: PropTypes.bool.isRequired
}

export default Message
