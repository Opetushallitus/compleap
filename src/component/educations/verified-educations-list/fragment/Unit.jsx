import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import ThumbIcon from 'resources/asset/thumb.svg'
import { emptyButton } from 'ui/properties'

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 1rem 0;
`

const ThumbButton = styled.button`
  ${emptyButton};
  font-size: 1.5rem;
`

const ThumbsUp = styled(ThumbButton)`
  margin-right: 2rem;
  fill: ${({ theme }) => theme.color.grayLighter};
`

const ThumbsDown = styled(ThumbButton)`
  display: inline-block;
  transform: rotate(180deg);
  fill: ${({ theme }) => theme.color.grayLighter};
`

const RatingOptions = () => {
  return (
    <div>
      <ThumbsUp><ThumbIcon/></ThumbsUp>
      <ThumbsDown><ThumbIcon/></ThumbsDown>
    </div>
  )
}

const Unit = ({ name }) => (
  <Container>
    {name}
    <RatingOptions/>
  </Container>
)

Unit.propTypes = {
  name: PropTypes.string.isRequired
}

export default Unit
