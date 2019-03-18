import React from 'react'
import PropTypes from 'prop-types'
import * as R from 'ramda'
import educationClassification from 'finnishEducationClassification2016'
import t from 'util/translate'
import { dispatch } from 'state/state'
import { InteractionEvent } from 'state/events'

const isMostSpecific = (v, k) => k.length === 4
const specifiers = R.pickBy(isMostSpecific, educationClassification)

const EducationSpecifierPicker = ({ selectedId = '' }) => (
  <div>
    <p>{t`Miltä alalta tutkinto on?`}</p>
    <select
      defaultValue={selectedId}
      onChange={({ target }) => dispatch({ type: InteractionEvent.SELECT_EDUCATION_SPECIFIER, data: { id: target.value } })}
    >
      <option value='' disabled>{t`Hae alaa`}</option>
      {Object.keys(specifiers).map(k => (
        <option key={k} value={k}>
          {t(specifiers[k])}
        </option>)
      )}
    </select>
  </div>
)

EducationSpecifierPicker.propTypes = {
  selectedId: PropTypes.string
}

export default EducationSpecifierPicker
