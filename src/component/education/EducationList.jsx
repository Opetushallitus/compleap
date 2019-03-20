import React, { useContext } from 'react'
import styled from 'styled-components'
import educations from 'educations'
import educationClassification from 'finnishEducationClassification2016'
import { Context, dispatch } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import t from 'util/translate'
import Button from 'component/generic/widget/Button'
import { InteractionEvent } from 'state/events'
import { H4 } from 'ui/typography'

const EducationCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: solid 1px ${({ theme }) => theme.color.gray};
  max-width: 600px;
  padding: 1rem;
  margin-bottom: 1.5rem;
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
          <H4>{educations[level.id]}</H4>
          {specifier && <DetailsText>{educationClassification[specifier.id]}</DetailsText>}
        </div>
        <div>
          <Button type='text' onClick={() => dispatch({ type: InteractionEvent.REMOVE_EDUCATION, data: { level, specifier } })}>
            {t`Poista tutkinto`}
          </Button>
        </div>
      </EducationCard>
    ))
  )
}

export default EducationList
