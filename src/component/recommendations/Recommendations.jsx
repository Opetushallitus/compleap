import React, { useContext } from 'react'
import B from 'baconjs'
import useTranslation from 'component/generic/hook/useTranslation'
import { H1 } from 'ui/typography'
import { Context } from 'state/state'
import {
  countSelectedInterests,
  pickAndFlattenInterests,
  pickAndFlattenUnverifiedEducation,
  pickAndFlattenVerifiedEducation
} from 'util/recommendationsHelper'
import useObservable from 'component/generic/hook/useObservable'
import useRecommendationsQuery from 'component/recommendations/useRecommendationsQuery'
import RecommendationResults from 'component/recommendations/recommendation-results/RecommendationResults'
import RequireInterestsMessage from 'component/recommendations/require-interests/RequireInterestsMessage'

const Recommendations = () => {
  const context$ = useContext(Context)
  const t = useTranslation()
  const status = useObservable(context$, { path: ['value', 'profile', 'recommendations'] })

  const unverifiedEducations$ = context$.map(({ context }) => context.education.data.unverifiedEducations)
  const verifiedEducations$ = context$.map(({ context }) => context.education.data.verifiedEducations)
  const interests$ = context$.map(({ context }) => context.interests.data)

  const hasRequiredInterests$ = countSelectedInterests(interests$).map(v => v >= process.env.MIN_INTERESTS).toProperty()

  const queryParams$ = B.combineTemplate({
    unverifiedEducations: pickAndFlattenUnverifiedEducation(unverifiedEducations$),
    verifiedEducations: pickAndFlattenVerifiedEducation(verifiedEducations$),
    interests: pickAndFlattenInterests(interests$)
  })
  const recommendationsResponse = useRecommendationsQuery(queryParams$, hasRequiredInterests$)

  const recommendations = recommendationsResponse || []
  const hasRequiredInterests = useObservable(hasRequiredInterests$, { skipDuplicates: true })

  return (
    <React.Fragment>
      <H1>{t`Suositellut opiskelupaikat`}</H1>
      <p>
        {t`Näytetään opintojesi ja valitsemiesi kiinnostusten perusteella sinulle sopivimpia opiskelupaikkoja hakualueeltasi. Voit halutessasi rajata aluetta tarkemmin.`}
      </p>
      {
        hasRequiredInterests
          ? <RecommendationResults recommendations={recommendations} status={status}/>
          : <RequireInterestsMessage/>
      }
    </React.Fragment>
  )
}

export default Recommendations
