import React, { useContext } from 'react'
import B from 'baconjs'
import useTranslation from 'component/generic/hook/useTranslation'
import { H1 } from 'ui/typography'
import { Context } from 'state/state'
import {
  countSelectedInterests, pickAndFlattenDownvotedVerifiedEducation,
  pickAndFlattenInterests,
  pickAndFlattenUnverifiedEducation,
  pickAndFlattenVerifiedEducation
} from 'util/recommendationsHelper'
import useObservable from 'component/generic/hook/useObservable'
import useRecommendationsQuery from 'component/recommendations/useRecommendationsQuery'
import RequireInterestsMessage from 'component/recommendations/require-interests/RequireInterestsMessage'
import ModelComparison from 'component/recommendations/model-comparison/ModelComparison'

const Recommendations = () => {
  const context$ = useContext(Context)
  const t = useTranslation()
  const status = useObservable(context$, { path: ['value', 'profile', 'recommendations'] })

  const unverifiedEducations$ = context$.map(({ context }) => context.education.data.unverifiedEducations)
  const verifiedEducations$ = context$.map(({ context }) => context.education.data.verifiedEducations)
  const interests$ = context$.map(({ context }) => context.interests.data)

  const hasRequiredInterests$ = countSelectedInterests(interests$).map(v => v >= process.env.MIN_INTERESTS).toProperty()

  const commonParams = {
    unverifiedEducations: pickAndFlattenUnverifiedEducation(unverifiedEducations$),
    verifiedEducations: pickAndFlattenVerifiedEducation(verifiedEducations$),
    verifiedDownvotedEducations: pickAndFlattenDownvotedVerifiedEducation(verifiedEducations$),
    interests: pickAndFlattenInterests(interests$)
  }

  const i = [1, 2, 3, 4]
  const modelParams = i.map(i => Object.assign({}, commonParams, { modelType: i }))
  const recommendationResponses = modelParams
    .map(B.combineTemplate)
    .map(params$ => useRecommendationsQuery(process.env.ALTERNATIVE_API_ENDPOINT, params$, hasRequiredInterests$) || [])

  const hasRequiredInterests = useObservable(hasRequiredInterests$, { skipDuplicates: true })

  return (
    <React.Fragment>
      <H1>{t`Suositellut opiskelupaikat`}</H1>
      <p>
        {t`Näytetään opintojesi ja valitsemiesi kiinnostusten perusteella sinulle sopivimpia opiskelupaikkoja hakualueeltasi. Voit halutessasi rajata aluetta tarkemmin.`}
      </p>
      {
        hasRequiredInterests
          ? <ModelComparison recommendations={recommendationResponses} status={status}/>
          : <RequireInterestsMessage/>
      }
    </React.Fragment>
  )
}

export default Recommendations
