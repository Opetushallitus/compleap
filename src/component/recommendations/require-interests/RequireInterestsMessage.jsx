import React from 'react'
import styled from 'styled-components'
import useTranslation from 'component/generic/hook/useTranslation'
import { roundedRectangle, shadowed } from 'ui/properties'

const Message = styled.div`
  ${roundedRectangle};
  ${shadowed};

  align-self: stretch;
  padding: 1.5rem 1rem;
  margin: 2rem 0 4rem 0;
`

const RequireInterestsMessage = () => {
  const t = useTranslation()
  return (
    <Message>
      <b>
        {t`Valitse ensin vähintään 5 kiinnostuksen kohdetta.`}
      </b>
    </Message>
  )
}

export default RequireInterestsMessage
