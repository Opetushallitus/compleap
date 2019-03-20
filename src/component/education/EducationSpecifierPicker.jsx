import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import educationClassification from 'finnishEducationClassification2016'
import t from 'util/translate'
import { dispatch } from 'state/state'
import { InteractionEvent } from 'state/events'

const isMostSpecific = (v, k) => k.length === 4
const pickMostSpecifics = R.pickBy(isMostSpecific)
const toSelectOptions = R.compose(R.map(([id, label]) => ({ id, label })), R.toPairs)
const sortById = R.sortBy(R.prop('id'))
const specifiers = R.compose(sortById, toSelectOptions, pickMostSpecifics)(educationClassification)

const EducationSpecifierPicker = ({ selectedId = '', addedIds }) => {
  const availableOptions = specifiers.filter(({ id }) => !addedIds.includes(id))

  return (
    <div>
      <p>{t`Miltä alalta tutkinto on?`}</p>
      <select
        value={selectedId}
        onChange={({ target }) => dispatch({ type: InteractionEvent.SELECT_EDUCATION_SPECIFIER, data: { id: target.value } })}
      >
        <option value='' disabled>{t`Hae alaa`}</option>
        {availableOptions.map(({ id, label }) => (
          <option key={id} value={id}>
            {t(label)}
          </option>)
        )}
      </select>
    </div>
  )
}

EducationSpecifierPicker.propTypes = {
  selectedId: PropTypes.string,
  addedIds: PropTypes.array
}

export default EducationSpecifierPicker
