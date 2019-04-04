import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { bordered, padded, roundedRectangle } from 'ui/properties'
import { children } from 'util/proptype'

const LayoutType = ['row', 'column']

const StyledCard = styled.div`
  ${roundedRectangle};
  ${padded};
  ${bordered};

  display: flex;
  flex-direction: ${({ layout }) => layout};
  justify-content: space-between;
  align-items: ${({ layout }) => layout === 'column' ? 'left' : 'center'};
  padding: 1rem;
  margin-bottom: 1.5rem;
  align-self: stretch;
`

const Card = ({ layout = 'row', children }) => <StyledCard layout={layout}>{children}</StyledCard>

Card.propTypes = {
  layout: PropTypes.oneOf(LayoutType),
  children
}

export default Card
