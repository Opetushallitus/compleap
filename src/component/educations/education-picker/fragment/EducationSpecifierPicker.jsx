import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as R from 'ramda'
import educationClassification from 'finnishEducationClassification2016'
import t from 'util/translate'
import Select from 'component/generic/widget/dropdown/Select'

const isMostSpecific = (v, k) => k.length === 4
const pickMostSpecifics = R.pickBy(isMostSpecific)
const toSelectOptions = R.compose(R.map(([id, label]) => ({ id, label })), R.toPairs)
const sortById = R.sortBy(R.prop('id'))
const specifiers = R.compose(sortById, toSelectOptions, pickMostSpecifics)(educationClassification)

const SelectContainer = styled.div`
  margin: 1rem 0;
`

const EducationSpecifierPicker = ({ selectedId = '', addedIds }) => {
  const availableOptions = specifiers.filter(({ id }) => !addedIds.includes(id))

  return (
    <div>
      <p>{t`Miltä alalta tutkinto on?`}</p>
      <SelectContainer>
        <Select
          placeholder={t`Hae alaa`}
          options={availableOptions}
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
