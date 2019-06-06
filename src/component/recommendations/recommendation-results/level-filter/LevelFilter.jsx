import React, { useContext } from 'react'
import styled from 'styled-components'
import * as R from 'ramda'
import levels from 'resources/levels'
import { Context, dispatch } from 'state/state'
import { InteractionEvent } from 'state/events'
import Select from 'component/generic/widget/dropdown/Select'
import useTranslation from 'component/generic/hook/useTranslation'
import useObservable from 'component/generic/hook/useObservable'
import Tag from 'component/generic/widget/Tag'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
`

const Label = styled.b`
  margin-right: 1rem;
`

const InputContainer = styled.div`
  min-width: 150px;
  margin-bottom: 0.5rem;
`

const LocationTagList = styled.ul`
  padding: 0;
  list-style: none;
  margin: 0 1rem;
`

const LocationTagListItem = styled.li`
  margin: 0.25rem;
  display: inline-block;
`

const LevelFilter = () => {
  const t = useTranslation()
  const context$ = useContext(Context)
  const selectedLevelIds = useObservable(context$, { path: ['context', 'recommendations', 'options', 'levels'] })

  const levelOptions = Object.entries(levels)
    .map(([id, name]) => ({ id, label: name }))
    .map(R.over(R.lensProp('label'), t))

  const availableOptions = levelOptions.filter(option => !selectedLevelIds.includes(option.id))

  return (
    <Container>
      <Label>{t`Taso` + ':'}</Label>
      <InputContainer>
        <Select
          placeholder={t`Lisää rajaus`}
          options={availableOptions}
          onSelect={id => dispatch({ type: InteractionEvent.ADD_RECOMMENDATION_LEVEL_FILTER, data: { id } })}
          selectedId={''}
        />
      </InputContainer>
      <LocationTagList>
        {selectedLevelIds.map(id => (
          <LocationTagListItem key={id}>
            <Tag
              id={id}
              name={t(levels[id])}
              onRemove={() => dispatch({ type: InteractionEvent.REMOVE_RECOMMENDATION_LEVEL_FILTER, data: { id } })}
            />
          </LocationTagListItem>
        ))}
      </LocationTagList>
    </Container>
  )
}

export default LevelFilter
