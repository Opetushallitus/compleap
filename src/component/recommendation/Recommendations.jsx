import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import t from 'util/translate'
import { H1 } from 'ui/typography'
import { padded, roundedRectangle, shadowed } from 'ui/properties'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import { RecommendationsState } from 'state/recommendationStates'
import useRecommendationsQuery from 'component/recommendation/useRecommendationsQuery'

const Placeholder = ({ loading }) => {
  const Container = styled.div`
    ${roundedRectangle};
    ${padded};
    
    align-self: stretch;
    min-height: 5rem;
    border: dashed 3px ${({ theme }) => theme.color.grayLightest}
    padding: 1rem;
    opacity: ${loading ? 0.4 : 1.0};
  `
  const Text = styled.div`
    border-top: solid 4px ${({ theme, darker }) => darker ? theme.color.grayLighter : theme.color.grayLightest};
    width: ${({ width }) => width}
    margin: 0.5rem 0;
  `

  const Expander = styled.div`
    ${roundedRectangle};
    ${padded};
    
    height: 3rem;
    background-color: ${({ theme }) => theme.color.grayLightest};
    margin: 1rem 0;
    padding: 1rem 0 1rem 1rem;
  `

  return (
    <Container>
      <Text width={'80%'}/>
      <Text width={'65%'} darker={true}/>
      <Text width={'82%'}/>
      <Text width={'86%'} darker={true}/>
      <Text width={'70%'}/>

      <br/>

      <Expander>
        <Text width={'80%'} darker={true}/>
        <Text width={'64%'} darker={true}/>
      </Expander>
      <Expander>
        <Text width={'72%'} darker={true}/>
        <Text width={'79%'} darker={true}/>
      </Expander>
      <Expander>
        <Text width={'86%'} darker={true}/>
        <Text width={'80%'} darker={true}/>
      </Expander>
    </Container>
  )
}

Placeholder.propTypes = {
  loading: PropTypes.bool
}

const Message = styled.div`
  ${roundedRectangle};
  ${shadowed};

  align-self: stretch;
  padding: 1.5rem 1rem;
  margin: 2rem 0 4rem 0;
`

const RequireInterests = () => (
  <Message>
    <b>
      {t`Valitse ensin vähintään 5 kiinnostuksen kohdetta.`}
    </b>
  </Message>
)

const Content = ({ recommendations, show, isPending }) => {
  if (!show) return <RequireInterests/>
  if (isPending) return <Placeholder loading={true}/> // TODO replace with actual loading indicator

  return <Placeholder/>
}

Content.propTypes = {
  status: PropTypes.oneOf(Object.values(RecommendationsState)),
  recommendations: PropTypes.any,
  show: PropTypes.bool,
  isPending: PropTypes.bool
}

const Recommendations = () => {
  const context$ = useContext(Context)
  const status = useObservable(context$, { path: ['value', 'profile', 'recommendations'] })

  const educations$ = context$.map(({ context }) => context.education.data.educations)
  const interests$ = context$.map(({ context }) => context.interests.data)

  const [recommendations, shouldShowRecommendations] = useRecommendationsQuery(educations$, interests$)

  return (
    <React.Fragment>
      <H1>{t`Suositellut opiskelupaikat`}</H1>
      <p>
        {t`Näytetään opintojesi ja valitsemiesi kiinnostusten perusteella sinulle sopivimpia opiskelupaikkoja hakualueeltasi. Voit halutessasi rajata aluetta tarkemmin.`}
      </p>
      <Content
        recommendations={recommendations}
        show={shouldShowRecommendations}
        isPending={status === RecommendationsState.pending}
      />
    </React.Fragment>
  )
}

export default Recommendations
