import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import qs from 'qs'
import { Context, dispatch } from 'state/state'
import { InteractionEvent } from 'state/events'
import useObservable from 'component/generic/hook/useObservable'
import CompetenceTag from './fragment/CompetenceTag'

const getLabelMatchingLanguage = (concept, language) => {
  switch (language) {
    case 'fi':
      return concept.preferredLabelFi
    case 'en':
    default:
      return concept.preferredLabelEn
  }
}

const List = styled.ul`
  list-style: none;
  padding: 0;
`

const ListItem = styled.li`
  display: inline-block;
`

const CompetenceList = ({ competences }) => {
  const context$ = useContext(Context)
  const lang = useObservable(context$, { path: ['context', 'user', 'language'] })

  return (
    <List>
      {
        competences.map(c => {
          const escoBaseUrl = `https://ec.europa.eu/esco/portal/skill`
          const escoParameters = qs.stringify({
            uri: c.conceptUri,
            conceptLanguage: lang
          })
          const escoLink = `${escoBaseUrl}?${escoParameters}`
          return (
            <ListItem key={c.conceptUri}>
              <CompetenceTag
                value={getLabelMatchingLanguage(c, lang)}
                selected={c.selected}
                onClick={() => dispatch({
                  type: InteractionEvent.TOGGLE_COMPETENCE,
                  data: { uri: c.conceptUri }
                })}
                seeMoreUrl={escoLink}
              >
                {getLabelMatchingLanguage(c, lang)}
              </CompetenceTag>
            </ListItem>
          )
        })
      }
    </List>
  )
}

CompetenceList.propTypes = {
  competences: PropTypes.array.isRequired
}

export default CompetenceList
