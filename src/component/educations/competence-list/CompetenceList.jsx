import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import qs from 'qs'
import { rounded } from 'ui/properties'
import useObservable from 'component/generic/hook/useObservable'
import { Context } from 'state/state'

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
  margin: 0.5rem;
`

const CompetenceTag = styled.div`
  ${rounded};

  position: relative;
  display: inline-block;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.color.accentLighter};
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: ${({ theme }) => `0 5px 10px 2px ${theme.color.grayLightest}`};
  height: 1rem;
  line-height: 1rem;
  padding: 0.3rem 1rem;
  vertical-align: bottom;
  transition: border-color 0.1s, background-color 0.1s;

  &:focus {
    outline: 0;
  }

  &:hover {
    border-color: ${({ theme }) => theme.color.accent};
    background-color: ${({ theme }) => theme.color.accentLightest};
  }
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
                <CompetenceTag>
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
