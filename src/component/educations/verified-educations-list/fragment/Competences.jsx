import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as R from 'ramda'
import qs from 'qs'
import { Context } from 'state/state'
import { rounded } from 'ui/properties'
import useObservable from 'component/generic/hook/useObservable'
import Spinner from 'component/generic/widget/Spinner'
import Alert from 'component/generic/widget/Alert'
import useTranslation from 'component/generic/hook/useTranslation'

const getLabelMatchingLanguage = (concept, language) => {
  switch (language) {
    case 'fi':
      return concept.preferredLabelFi
    case 'en':
    default:
      return concept.preferredLabelEn
  }
}

const CompetenceList = styled.ul`
  list-style: none;
  padding: 0;
`

const CompetenceListItem = styled.li`
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

const Competences = ({ educationUri }) => {
  const t = useTranslation()
  const context$ = useContext(Context)
  const lang = useObservable(context$, { path: ['context', 'user', 'language'] })
  const competences = useObservable(context$, { path: ['context', 'competences', 'data', 'fromVerifiedEducation', educationUri] }) || []
  const status = useObservable(context$, { path: ['value', 'profile', 'education', 'verifiedEducationCompetences'] })
  const uniqs = R.uniqBy(R.prop('conceptUri'), competences)

  if (status === 'pending') return <Spinner/>
  if (status === 'failure') return <Alert level='error'><p>{t`Tapahtui odottamaton virhe eikä kompetensseja pystytä juuri nyt näyttämään.`}</p></Alert>

  return (
    <>
      <p>{t`Tämän tutkinnon opinnoista sinulle on kertynyt seuraavanlaista osaamista`}</p>
      <CompetenceList>
        {
          uniqs.map(c => {
            const escoBaseUrl = `https://ec.europa.eu/esco/portal/skill`
            const escoParameters = qs.stringify({
              uri: c.conceptUri,
              conceptLanguage: lang
            })
            const escoLink = `${escoBaseUrl}?${escoParameters}`
            return (
              <CompetenceListItem key={c.conceptUri}>
                <CompetenceTag>
                  <EscoLink href={escoLink} target='_blank' rel='noopener noreferrer'>
                    {getLabelMatchingLanguage(c, lang)}
                  </EscoLink>
                </CompetenceTag>
              </CompetenceListItem>
            )
          })
        }
      </CompetenceList>
    </>
  )
}

Competences.propTypes = {
  educationUri: PropTypes.string.isRequired
}

export default Competences
