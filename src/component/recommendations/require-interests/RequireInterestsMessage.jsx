import React from 'react'
import styled from 'styled-components'
import t from 'util/translate'
import { roundedRectangle, shadowed } from 'ui/properties'

const Message = styled.div`
  ${roundedRectangle};
  ${shadowed};

  align-self: stretch;
  padding: 1.5rem 1rem;
  margin: 2rem 0 4rem 0;
`

const RequireInterestsMessage = () => (
  <Message>
    <b>
      {t`Valitse ensin vähintään 5 kiinnostuksen kohdetta.`}
    </b>
  </Message>
)

export default RequireInterestsMessage
