import React, { useContext } from 'react'
import styled from 'styled-components'
import educations from 'educations'
import educationClassification from 'finnishEducationClassification2016'
import { Context, dispatch } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import t from 'util/translate'
import Button from 'component/generic/widget/Button'
import { InteractionEvent } from 'state/events'
import { H3 } from 'ui/typography'
import { bordered, padded, roundedRectangle } from 'ui/properties'

const EducationCard = styled.div`
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

const DetailsText = styled.p`
  margin-bottom: 0;
`

const EducationList = () => {
  const context$ = useContext(Context)
  const educationsList = useObservable(context$, { path: ['context', 'education', 'data', 'educations'] })

  return (
    educationsList && educationsList.map(({ id, level, specifier }) => (
      <EducationCard key={id}>
        <div>
          <H3>{educations[level.id]}</H3>
          {specifier && <DetailsText>{educationClassification[specifier.id]}</DetailsText>}
        </div>
        <div>
          <Button type='text' onClick={() => dispatch({ type: InteractionEvent.REMOVE_EDUCATION, data: { id } })}>
            {t`Poista tutkinto`}
          </Button>
        </div>
      </EducationCard>
    ))
  )
}

export default EducationList
