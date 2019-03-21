import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as R from 'ramda'
import educationClassification from 'finnishEducationClassification2016'
import t from 'util/translate'
import { dispatch } from 'state/state'
import { InteractionEvent } from 'state/events'
import { bordered, roundedRectangle } from 'ui/properties'

const isMostSpecific = (v, k) => k.length === 4
const pickMostSpecifics = R.pickBy(isMostSpecific)
const toSelectOptions = R.compose(R.map(([id, label]) => ({ id, label })), R.toPairs)
const sortById = R.sortBy(R.prop('id'))
const specifiers = R.compose(sortById, toSelectOptions, pickMostSpecifics)(educationClassification)

const SpecifierInput = styled.select`
  ${roundedRectangle};
  ${bordered};

  height: 2.2rem;
  background-color: ${({ theme }) => theme.color.grayLightest};
  border-color: ${({ theme }) => theme.color.grayLighter};
  font-size: ${({ theme }) => theme.font.size.base};
  margin: 0.5rem 0;
`

const EducationSpecifierPicker = ({ selectedId = '', addedIds }) => {
  const availableOptions = specifiers.filter(({ id }) => !addedIds.includes(id))

  return (
    <div>
      <p>{t`Miltä alalta tutkinto on?`}</p>
      <SpecifierInput
        value={selectedId}
        onChange={({ target }) => dispatch({ type: InteractionEvent.SELECT_EDUCATION_SPECIFIER, data: { id: target.value } })}
      >
        <option value='' disabled>{t`Hae alaa`}</option>
        {availableOptions.map(({ id, label }) => (
          <option key={id} value={id}>
            {t(label)}
          </option>)
        )}
      </SpecifierInput>
    </div>
  )
}

EducationSpecifierPicker.propTypes = {
  selectedId: PropTypes.string,
  addedIds: PropTypes.array
}

export default EducationSpecifierPicker
