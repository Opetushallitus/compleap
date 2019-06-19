import React, { useContext, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import * as R from 'ramda'
import regions from 'resources/regions'
import levels from 'resources/levels'
import typeToLevel from 'resources/mock/educationTypeToLevel'
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

const levelsByName = R.invertObj(levels)
const typeToLevelId = type => {
  const levelName = typeToLevel[type]
  if (!levelName) console.error(`Could not resolve recommendation level for type ${type}`)
  return levelsByName[levelName]
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

  const alternativeModels = results.map(alternatives => alternatives.map(recommendation => Recommendation(recommendation)))

  const locationIdWhitelist = useObservable(context$, { path: ['context', 'recommendations', 'options', 'locations'] })
  const levelIdWhitelist = useObservable(context$, { path: ['context', 'recommendations', 'options', 'levels'] })
  const existingVerifiedEducation = useObservable(context$, { path: ['context', 'education', 'data', 'verifiedEducations'] }).map(v => v.uri)

  const modelOptionsWithoutExistingVerified = alternativeModels.map(model => model.filter(({ koulutuskoodi }) => !existingVerifiedEducation.includes(koulutuskoodi)))
  const assocRegionIds = option => R.assoc('regionId', findRegionId(option.providerProvince), option)
  const assocLevelIds = option => R.assoc('levelId', typeToLevelId(option.type), option)
  const modelOptionsWithMetadata = R.map(R.compose(R.map(assocLevelIds), R.map(assocRegionIds)))(modelOptionsWithoutExistingVerified)

  const matchRegions = option => locationIdWhitelist.length === 0 || locationIdWhitelist.includes(option.regionId)
  const matchLevels = option => levelIdWhitelist.length === 0 || levelIdWhitelist.includes(option.levelId)
  const modelsCurrentMatchingOptions = modelOptionsWithMetadata.map(model => model.filter(R.both(matchRegions, matchLevels)))

  const groupedBySpecialisation = modelsCurrentMatchingOptions.map(R.compose(Object.entries, R.groupBy(v => v.name)))
  const maxRecommendationListLength = Math.max(...groupedBySpecialisation.map(list => list.length))

  return (
    <React.Fragment>
      <Table>
        <thead>
          <tr>{R.prepend(null, groupedBySpecialisation).map((_, i) => <TH key={i}>{i > 0 ? i : ''}</TH>)}</tr>
        </thead>
        <tbody>
          {
            R.range(0, maxRecommendationListLength).map(i => (
              <Row key={i}>
                <RowLabel>{i + 1}</RowLabel>
                {
                  R.range(0, groupedBySpecialisation.length).map(j => {
                    const recommendation = groupedBySpecialisation[j][i]
                    if (!recommendation) return <Data/>

                    const [title, applicationOptions] = recommendation
                    return (
                      <ResultSummary
                        key={`${j}_${title}`}
                        recommendations={applicationOptions}
                        onClick={() => setActiveDetails(applicationOptions)}
                      />
                    )
                  })
                }
              </Row>
            ))
          }
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
