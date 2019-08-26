import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import qs from 'qs'
import { Context } from 'state/state'
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

const EscoLink = styled.a`
  text-decoration: none;
  color: ${({ theme }) => theme.color.black}
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
              <EscoLink href={escoLink} target='_blank' rel='noopener noreferrer'>
                <CompetenceTag
                  value={getLabelMatchingLanguage(c, lang)}
                  selected={false}
                  onClick={() => console.log('select')}
                >
                  {getLabelMatchingLanguage(c, lang)}
                </CompetenceTag>
              </EscoLink>
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
