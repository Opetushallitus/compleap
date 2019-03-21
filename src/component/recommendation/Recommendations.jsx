import React from 'react'
import styled from 'styled-components'
import t from 'util/translate'
import { H1 } from 'ui/typography'
import { roundedRectangle } from 'ui/properties'

const Placeholder = () => {
  const Container = styled.div`
    ${roundedRectangle};
    
    align-self: stretch;
    min-height: 5rem;
    border: dashed 3px ${({ theme }) => theme.color.grayLightest}
    padding: 1rem;
  `
  const Text = styled.div`
    border-top: solid 4px ${({ theme, darker }) => darker ? theme.color.grayLighter : theme.color.grayLightest};
    width: ${({ width }) => width}
    margin: 0.5rem 0;
  `

  const Expander = styled.div`
    ${roundedRectangle};
    
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

const Recommendations = () => (
  <React.Fragment>
    <H1>{t`Suositellut opiskelupaikat`}</H1>
    <Placeholder/>
  </React.Fragment>
)

export default Recommendations
