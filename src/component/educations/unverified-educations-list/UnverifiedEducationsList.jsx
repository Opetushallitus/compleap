/* eslint-disable react/display-name */
import React, { useContext } from 'react'
import styled from 'styled-components'
import educations from 'resources/educations'
import educationClassification from 'resources/finnishEducationClassification2016'
import { Context, dispatch } from 'state/state'
import { InteractionEvent } from 'state/events'
import { H2, H3 } from 'ui/typography'
import useObservable from 'component/generic/hook/useObservable'
import useTranslation from 'component/generic/hook/useTranslation'
import Card from 'component/generic/widget/Card'
import Button from 'component/generic/widget/Button'
import TabView from 'component/generic/widget/TabView/TabView'
import Competences from './fragment/Competences'
import { isVocational } from 'util/educationHelper'

const DetailsText = styled.p`
  margin-bottom: 0;
`

const EducationHeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const UnverifiedEducationsList = () => {
  const context$ = useContext(Context)
  const t = useTranslation()
  const unverifiedEducationsList = useObservable(context$, { path: ['context', 'education', 'data', 'unverifiedEducations'] })

  if (!unverifiedEducationsList) return null

  return (
    <React.Fragment>
      {unverifiedEducationsList.length > 0 && <H2>{t`Ulkomailla suoritetut tutkinnot`}</H2>}
      {unverifiedEducationsList.map(({ id, level, specifier, code }) => (
        <Card key={id} layout='column'>
          <EducationHeaderRow>
            <div>
              <H3>{t(educations[level.id])}</H3>
              {specifier && <DetailsText>{t(educationClassification[specifier.id])}</DetailsText>}
            </div>
            <div>
              <Button type='text' onClick={() => dispatch({ type: InteractionEvent.REMOVE_EDUCATION, data: { id, code } })}>
                {t`Poista tutkinto`}
              </Button>
            </div>
          </EducationHeaderRow>
          {isVocational(level.id) && (
            <TabView
              titles={['Tutkintoon liittyvä osaaminen']}
              views={[_ => <Competences educationUri={code}/>]}
            />
          )}
        </Card>
      ))}
    </React.Fragment>
  )
}

export default UnverifiedEducationsList
