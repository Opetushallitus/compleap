import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useTranslation from 'component/generic/hook/useTranslation'
import Card from 'component/generic/widget/Card'
import { H4 } from 'ui/typography'
import Unit from 'component/educations/verified-educations-list/fragment/Unit'

const DegreeHeaderContainer = styled.section`
  border-bottom: solid 3px ${({ theme }) => theme.color.grayLightest};
  padding-bottom: 0.5rem;
`

const Status = ({ status }) => {
  const t = useTranslation()
  return (
    status.completed
      ? `${t('Valmistunut')}, ${new Date(status.date).getFullYear()}`
      : t`Kesken`
  )
}

Status.propTypes = {
  status: PropTypes.object
}

const Degree = ({ name, qualificationTitles, status, units }) => {
  const t = useTranslation()
  return (
    <Card layout='column'>
      <DegreeHeaderContainer>
        <H4>{[qualificationTitles.map(t).join(', '), t(name)].filter(v => !!v).join(': ')}</H4>
        <Status status={status}/>
      </DegreeHeaderContainer>
      <p>{t`Merkitse mitä pidit opintojesi aiheista, niin voimme antaa parempia suosituksia koulutuksista. Voit myös jättää valinnan tyhjäksi.`}</p>
      <div>
        {units.map(({ id, uri, name, rating }) => (
          <Unit
            key={uri}
            id={id}
            name={t(name)}
            rating={rating}
          />
        ))}
      </div>
    </Card>
  )
}

Degree.propTypes = {
  name: PropTypes.object,
  qualificationTitles: PropTypes.array,
  status: PropTypes.object,
  units: PropTypes.array
}

export default Degree
