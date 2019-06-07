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

  const queryParamsA$ = B.combineTemplate({
    unverifiedEducations: pickAndFlattenUnverifiedEducation(unverifiedEducations$),
    verifiedEducations: pickAndFlattenVerifiedEducation(verifiedEducations$),
    interests: pickAndFlattenInterests(interests$)
  })

  const queryParamsB$ = B.combineTemplate({
    unverifiedEducations: pickAndFlattenUnverifiedEducation(unverifiedEducations$),
    verifiedEducations: pickAndFlattenVerifiedEducation(verifiedEducations$),
    verifiedDownvotedEducations: pickAndFlattenDownvotedVerifiedEducation(verifiedEducations$),
    interests: pickAndFlattenInterests(interests$)
  })

  const recommendationsResponseA = useRecommendationsQuery(process.env.API_ENDPOINT, queryParamsA$, hasRequiredInterests$)
  const recommendationsResponseB = useRecommendationsQuery(process.env.ALTERNATIVE_API_ENDPOINT, queryParamsB$, hasRequiredInterests$)

  const recommendationsA = recommendationsResponseA || []
  const recommendationsB = recommendationsResponseB || []

  const hasRequiredInterests = useObservable(hasRequiredInterests$, { skipDuplicates: true })

  return (
    <React.Fragment>
      <H1>{t`Suositellut opiskelupaikat`}</H1>
      <p>
        {t`Näytetään opintojesi ja valitsemiesi kiinnostusten perusteella sinulle sopivimpia opiskelupaikkoja hakualueeltasi. Voit halutessasi rajata aluetta tarkemmin.`}
      </p>
      {
        hasRequiredInterests
          ? <ModelComparison recommendations={[recommendationsA, recommendationsB]} status={status}/>
          : <RequireInterestsMessage/>
      }
    </React.Fragment>
  )
}

export default Recommendations
