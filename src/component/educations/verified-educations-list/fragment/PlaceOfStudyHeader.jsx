import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { H3 } from 'ui/typography'

const PlaceOfStudyHeaderContainer = styled.section`
  width: 100%;
  border-bottom: solid 3px ${({ theme }) => theme.color.grayLightest};
  margin-bottom: 1rem;
`

const PlaceOfStudyHeader = ({ place }) => (
  <PlaceOfStudyHeaderContainer>
    <H3>{place}</H3>
  </PlaceOfStudyHeaderContainer>
)

PlaceOfStudyHeader.propTypes = {
  place: PropTypes.string
}

export default PlaceOfStudyHeader
