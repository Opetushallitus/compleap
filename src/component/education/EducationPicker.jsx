import React from 'react'
import styled from 'styled-components'
import educations from 'educations'
import { dispatch } from 'state/state'
import t from 'util/translate'
import { H2, H3 } from 'ui/typography'
import { InteractionEvent } from 'state/events'

const EducationOptionsList = styled.ul`
  list-style: none;
`

const EducationPicker = () => (
  <React.Fragment>
    <H2>{t`Koulutukset`}</H2>
    <H3>{t`Olen suorittanut tutkinnon ulkomailla`}</H3>
    <p>{t`Minkä tasoisesta tutkinnosta on kyse?`}</p>
    <EducationOptionsList>
      {
        Object.entries(educations).map(([id, education]) => (
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
          </li>
        ))
      }
    </EducationOptionsList>
  </React.Fragment>
)

export default EducationPicker
