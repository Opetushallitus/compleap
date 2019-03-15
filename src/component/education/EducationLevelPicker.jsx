import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { dispatch } from 'state/state'
import { InteractionEvent } from 'state/events'
import t from 'util/translate'
import EducationSpecifierPicker from 'component/education/EducationSpecifierPicker'

const EducationOptionsList = styled.ul`
  list-style: none;
`

const EducationLevelPicker = ({ options, selectedId, requireSpecifier = false }) => (
  <EducationOptionsList>
    {
      options.map(([id, education]) => (
        <li key={id}>
          <input
            id={id}
            type='radio'
            name='level'
            onChange={({ target }) => dispatch({ type: InteractionEvent.SELECT_EDUCATION, data: { id: target.id } })}
          />
          <label htmlFor={id}>
            {t(education)}
          </label>
          {
            selectedId === id && requireSpecifier && <EducationSpecifierPicker/>
          }
        </li>
      ))
    }
  </EducationOptionsList>
)

EducationLevelPicker.propTypes = {
  options: PropTypes.array.isRequired,
  selectedId: PropTypes.string,
  requireSpecifier: PropTypes.bool
}

export default EducationLevelPicker
