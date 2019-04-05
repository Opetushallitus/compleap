import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as R from 'ramda'
import educationClassification from 'resources/finnishEducationClassification2016'
import { dispatch } from 'state/state'
import { InteractionEvent } from 'state/events'
import t from 'util/translate'
import Select from 'component/generic/widget/dropdown/Select'

// TODO This only serves here as a filter for available education options
import educationToLearningOpportunity from 'resources/mock/educationClassificationToLearningOpportunityCode'

// TODO Replace with more complete set of available education classes
// Here we only use a subset of education classification codes;
// we only use the ones that have matching vocational eRequirements
const educationClassificationVocational = R.pick(Object.keys(educationToLearningOpportunity), educationClassification)

const isMostSpecific = (v, k) => k.length === 4
const pickMostSpecifics = R.pickBy(isMostSpecific)
const toSelectOptions = R.compose(R.map(([id, label]) => ({ id, label })), R.toPairs)
const sortById = R.sortBy(R.prop('id'))
const specifiers = R.compose(sortById, toSelectOptions, pickMostSpecifics)(educationClassificationVocational)

const SelectContainer = styled.div`
  margin: 1rem 0;
`

const EducationSpecifierPicker = ({ selectedId = '', addedIds }) => {
  const availableOptions = specifiers.filter(({ id }) => !addedIds.includes(id))
  const translatedOptions = availableOptions.map(option => R.over(R.lensProp('label'), t, option))

  return (
    <div>
      <p>{t`Miltä alalta tutkinto on?`}</p>
      <SelectContainer>
        <Select
          placeholder={t`Hae alaa`}
          options={translatedOptions}
          onSelect={id => dispatch({ type: InteractionEvent.SELECT_EDUCATION_SPECIFIER, data: { id } })}
          selectedId={selectedId}
        />
      </SelectContainer>
    </div>
  )
}

EducationSpecifierPicker.propTypes = {
  selectedId: PropTypes.string,
  addedIds: PropTypes.array
}

export default EducationSpecifierPicker
