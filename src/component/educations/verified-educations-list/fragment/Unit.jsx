import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ThumbIcon from 'resources/asset/thumb.svg'
import { emptyButton } from 'ui/properties'
import { dispatch } from 'state/state'
import { InteractionEvent } from 'state/events'
import Rating from 'model/enum/Rating'

const Container = styled.div`
  display: flex;
  max-width: 600px;
  justify-content: space-between;
  align-items: center;
  margin: 1rem 0;
`

const Line = styled.div`
  border-top: solid 2px ${({ theme }) => theme.color.grayLightest};
  flex-grow: 1;
  margin: 0 1rem;
`

const ThumbButton = styled.button`
  ${emptyButton};
  font-size: 1.5rem;
  
  &:hover {
    filter: brightness(0.8);
  }

  &:active {
    filter: brightness(0.6);
  }
`

const ThumbsUp = styled(ThumbButton)`
  margin-right: 2rem;
  fill: ${({ active, theme }) => active ? theme.color.positive : theme.color.grayLighter};
`

const ThumbsDown = styled(ThumbButton)`
  display: inline-block;
  transform: rotate(180deg);
  fill: ${({ active, theme }) => active ? theme.color.negative : theme.color.grayLighter};
`

const RatingOptions = ({ className, id, rating }) => (
  <div className={className}>
    <ThumbsUp
      onClick={() => dispatch({ type: InteractionEvent.LIKE_EDUCATION_UNIT, data: { id } })}
      active={rating === Rating.LIKE}
    >
      <ThumbIcon/>
    </ThumbsUp>
    <ThumbsDown
      onClick={() => dispatch({ type: InteractionEvent.DISLIKE_EDUCATION_UNIT, data: { id } })}
      active={rating === Rating.DISLIKE}
    >
      <ThumbIcon/>
    </ThumbsDown>
  </div>
)

const StyledRatingOptions = styled(RatingOptions)`
  flex-shrink: 0;
`

RatingOptions.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  rating: PropTypes.oneOf(Object.values(Rating)).isRequired
}

const Unit = ({ id, name, rating }) => (
  <Container>
    {name}
    <Line/>
    <StyledRatingOptions id={id} rating={rating}/>
  </Container>
)

Unit.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rating: PropTypes.oneOf(Object.values(Rating))
}

export default Unit
