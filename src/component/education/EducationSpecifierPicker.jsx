import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as R from 'ramda'
import educationClassification from 'finnishEducationClassification2016'
import t from 'util/translate'
import SearchableDropdown from 'component/generic/widget/dropdown/SearchableDropdown'

const isMostSpecific = (v, k) => k.length === 4
const pickMostSpecifics = R.pickBy(isMostSpecific)
const toSelectOptions = R.compose(R.map(([id, label]) => ({ id, label })), R.toPairs)
const sortById = R.sortBy(R.prop('id'))
const specifiers = R.compose(sortById, toSelectOptions, pickMostSpecifics)(educationClassification)

const DropdownContainer = styled.div`
  margin: 1rem 0;
`

const EducationSpecifierPicker = ({ selectedId = '', addedIds }) => {
  const availableOptions = specifiers.filter(({ id }) => !addedIds.includes(id))

  return (
    <div>
      <p>{t`Miltä alalta tutkinto on?`}</p>
      <DropdownContainer>
        <SearchableDropdown
          placeholder={t`Hae alaa`}
          options={availableOptions}
          selectedId={selectedId}
        />
      </DropdownContainer>
    </div>
  )
}

EducationSpecifierPicker.propTypes = {
  selectedId: PropTypes.string,
  addedIds: PropTypes.array
}

export default EducationSpecifierPicker
