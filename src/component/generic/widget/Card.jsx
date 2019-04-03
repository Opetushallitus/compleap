import styled from 'styled-components'
import { bordered, padded, roundedRectangle } from 'ui/properties'

const Card = styled.div`
  ${roundedRectangle};
  ${padded};
  ${bordered};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 1.5rem;
  align-self: stretch;
`

export default Card
