import React, { useContext } from 'react'
import styled from 'styled-components'
import educations from 'resources/educations'
import educationClassification from 'resources/finnishEducationClassification2016'
import { Context, dispatch } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import t from 'util/translate'
import Card from 'component/generic/widget/Card'
import Button from 'component/generic/widget/Button'
import { InteractionEvent } from 'state/events'
import { H3 } from 'ui/typography'

const DetailsText = styled.p`
  margin-bottom: 0;
`

const UnverifiedEducationsList = () => {
  const context$ = useContext(Context)
  const unverifiedEducationsList = useObservable(context$, { path: ['context', 'education', 'data', 'unverifiedEducations'] })

  if (!unverifiedEducationsList) return null

  return unverifiedEducationsList.map(({ id, level, specifier }) => (
    <Card key={id}>
      <div>
        <H3>{educations[level.id]}</H3>
        {specifier && <DetailsText>{educationClassification[specifier.id]}</DetailsText>}
      </div>
      <div>
        <Button type='text' onClick={() => dispatch({ type: InteractionEvent.REMOVE_EDUCATION, data: { id } })}>
          {t`Poista tutkinto`}
        </Button>
      </div>
    </Card>
  ))
}

export default UnverifiedEducationsList
