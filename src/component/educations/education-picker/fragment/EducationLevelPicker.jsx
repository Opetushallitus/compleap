import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { dispatch } from 'state/state'
import { InteractionEvent } from 'state/events'
import t from 'util/translate'
import EducationSpecifierPicker from 'component/educations/education-picker/fragment/EducationSpecifierPicker'

const EducationOptionsList = styled.ul`
  list-style: none;
  padding-left: 1rem;
`

const EducationOption = styled.li`
  margin: 0.5rem 0;
`

const EducationOptionInput = styled.input`
  width: 1rem;
  height: 1rem;
  margin: 0;
`

const EducationOptionLabel = styled.label`
  margin-left: 0.75rem;
`

const EducationSpecifierContainer = styled.div`
  margin-left: 1.75rem;
`

const EducationLevelPicker = ({ options, selectedId, selectedSpecifierId, addedSpecifierIds, showSpecifierPicker = false }) => (
  <EducationOptionsList>
    {
      options.map(([id, education]) => (
        <EducationOption key={id}>
          <EducationOptionInput
            id={id}
            type='radio'
            name='level'
            checked={selectedId === id}
            onChange={({ target }) => dispatch({ type: InteractionEvent.SELECT_EDUCATION, data: { id: target.id } })}
          />
          <EducationOptionLabel htmlFor={id}>
            {t(education)}
          </EducationOptionLabel>
          {
            selectedId === id && showSpecifierPicker && (
              <EducationSpecifierContainer>
                <EducationSpecifierPicker
                  selectedId={selectedSpecifierId}
                  addedIds={addedSpecifierIds}
                />
              </EducationSpecifierContainer>
            )
          }
        </EducationOption>
      ))
    }
  </EducationOptionsList>
)

EducationLevelPicker.propTypes = {
  options: PropTypes.array.isRequired,
  selectedId: PropTypes.string,
  selectedSpecifierId: PropTypes.string,
  addedSpecifierIds: PropTypes.array,
  showSpecifierPicker: PropTypes.bool
}

export default EducationLevelPicker
