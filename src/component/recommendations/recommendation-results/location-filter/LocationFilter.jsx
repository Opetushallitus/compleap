import React, { useContext } from 'react'
import * as R from 'ramda'
import styled from 'styled-components'
import regions from 'resources/regions'
import { Context, dispatch } from 'state/state'
import Select from 'component/generic/widget/dropdown/Select'
import useTranslation from 'component/generic/hook/useTranslation'
import { InteractionEvent } from 'state/events'
import useObservable from 'component/generic/hook/useObservable'
import Tag from 'component/recommendations/recommendation-results/location-filter/fragment/Tag'

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

const LocationFilter = () => {
  const t = useTranslation()
  const context$ = useContext(Context)
  const selectedLocationIds = useObservable(context$, { path: ['context', 'recommendations', 'options', 'locations'] })

  const regionOptions = Object.entries(regions)
    .map(([id, name]) => ({ id, label: name }))
    .map(R.over(R.lensProp('label'), t))

  const availableOptions = regionOptions.filter(option => !selectedLocationIds.includes(option.id))

  return (
    <Container>
      <Label>{t`Sijainti` + ':'}</Label>
      <InputContainer>
        <Select
          placeholder={t`Lisää rajaus`}
          options={availableOptions}
          onSelect={id => dispatch({ type: InteractionEvent.ADD_RECOMMENDATION_LOCATION_FILTER, data: { id } })}
          selectedId={''}
        />
      </InputContainer>
      <LocationTagList>
        {selectedLocationIds.map(id => (
          <LocationTagListItem key={id}>
            <Tag id={id} name={t(regions[id])}/>
          </LocationTagListItem>
        ))}
      </LocationTagList>
    </Container>
  )
}

export default LocationFilter
