import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import t from 'util/translate'
import Card from 'component/generic/widget/Card'
import { H4 } from 'ui/typography'
import Unit from 'component/educations/verified-educations-list/fragment/Unit'

const DegreeHeaderContainer = styled.section`
  border-bottom: solid 3px ${({ theme }) => theme.color.grayLightest};
  padding-bottom: 0.5rem;
`

const Status = ({ status }) => status.completed
  ? `${t('Valmistunut')}, ${new Date(status.date).getFullYear()}`
  : t`Kesken`

Status.propTypes = {
  status: PropTypes.object
}

const Degree = ({ name, qualificationTitles, status, units }) => (
  <Card layout='column'>
    <DegreeHeaderContainer>
      <H4>{`${qualificationTitles.map(t).join(', ')}: ${t(name)}`}</H4>
      <Status status={status}/>
    </DegreeHeaderContainer>
    <p>{t`Kerro mitä pidit opinnoistasi, niin voimme antaa parempia suosituksia. Voit myös jättää valinnan tyhjäksi.`}</p>
    <div>
      {
        units.map(({ uri, name }) => (
          <Unit key={uri}>
            <div>{t(name)}</div>
          </Unit>
        ))
      }
    </div>
  </Card>
)

Degree.propTypes = {
  name: PropTypes.object,
  qualificationTitles: PropTypes.array,
  status: PropTypes.object,
  units: PropTypes.array
}

export default Degree
