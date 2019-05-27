import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as R from 'ramda'
import regions from 'resources/regions'
import { Context } from 'state/state'
import { RecommendationsState } from 'state/recommendationStates'
import useObservable from 'component/generic/hook/useObservable'
import Recommendation from 'model/Recommendation'
import RecommendationDetails from 'component/recommendations/model-comparison/fragment/RecommendationDetails'

const regionsByName = R.compose(R.map(R.head), R.invert, R.map(langs => langs['fi']))(regions)
const findRegionId = regionName => {
  const id = regionsByName[regionName]
  if (!id) {
    console.error(`Unmatched region: cannot find region id for region name ${regionName}`)
    return -1
  }
  return id
}

const Table = styled.table`
  border-collapse: collapse;
`

const Row = styled.tr`
  
  &:nth-child(odd) {
    background-color: ${({ theme }) => theme.color.white};
  }
  
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.color.grayLightest};
  }
`

const TH = styled.th`
  padding: 1rem 0.5rem;
`

const RowLabel = styled.td`
  padding: 1rem 1rem 1rem 0;
  border: none;
  background: ${({ theme }) => theme.color.white};
`

const Data = styled.td`
  padding: 1rem 0.5rem;
  border: solid 1px ${({ theme }) => theme.color.grayLighter};
  
  &:hover {
    background-color: ${({ theme }) => theme.color.primaryLightest};
    cursor: pointer;
  }
`

const ResultSummary = ({ recommendations, onClick }) => {
  const degreeTitles = R.compose(str => str.join(', '), R.sort((a, b) => a.localeCompare(b)), R.uniq, R.map(({ degreeTitle }) => degreeTitle))(recommendations)
  const head = recommendations[0]
  const { name, educationCode } = head

  return (
    <Data onClick={onClick}>
      <div>
        <b>{degreeTitles}</b>
      </div>
      <div>
        {name}
      </div>
      <div>
        {educationCode}
      </div>
    </Data>
  )
}

ResultSummary.propTypes = {
  recommendations: PropTypes.array,
  onClick: PropTypes.func
}

const ComparisonTable = ({ results }) => {
  const context$ = useContext(Context)
  const [activeDetails, setActiveDetails] = useState(null)

  const validatedRecommendations = results.map(alternatives => alternatives.map(recommendation => Recommendation(recommendation)))

  const locationIdWhitelist = useObservable(context$, { path: ['context', 'recommendations', 'options', 'locations'] })
  const existingVerifiedEducation = useObservable(context$, { path: ['context', 'education', 'data', 'verifiedEducations'] }).map(v => v.uri)

  const optionsWithoutExistingVerified = validatedRecommendations.map(v => v.filter(({ koulutuskoodi }) => !existingVerifiedEducation.includes(koulutuskoodi)))
  const optionsWithRegionIds = optionsWithoutExistingVerified.map(v => v.map(option => R.assoc('regionId', findRegionId(option.providerProvince), option)))
  const currentMatchingOptions = locationIdWhitelist.length > 0 ? optionsWithRegionIds.map(v => v.filter(option => locationIdWhitelist.includes(option.regionId))) : optionsWithRegionIds

  const groupedBySpecialisation = currentMatchingOptions.map(R.compose(Object.entries, R.groupBy(v => v.name)))

  const zipped = R.zip(...groupedBySpecialisation)

  return (
    <React.Fragment>
      <Table>
        <thead>
          <tr>{R.prepend(null, groupedBySpecialisation).map((_, i) => <TH key={i}>{i > 0 ? i : ''}</TH>)}</tr>
        </thead>
        <tbody>
          {zipped.map((alternatives, i) => (
            <Row key={i}>
              <RowLabel>{i + 1}</RowLabel>
              {alternatives.map(([title, applicationOptions], i) => (
                <ResultSummary
                  key={`${i}_${title}`}
                  recommendations={applicationOptions}
                  onClick={() => setActiveDetails(applicationOptions)}
                />
              ))}
            </Row>
          ))}
        </tbody>
      </Table>
      {activeDetails && <RecommendationDetails applicationOptions={activeDetails} onClose={() => setActiveDetails(null)}/>}
    </React.Fragment>
  )
}

ComparisonTable.propTypes = {
  results: PropTypes.any,
  status: PropTypes.oneOf(Object.values(RecommendationsState))
}

export default ComparisonTable
