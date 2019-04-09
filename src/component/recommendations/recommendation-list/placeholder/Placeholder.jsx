import React from 'react'
import styled from 'styled-components'
import { padded, roundedRectangle } from 'ui/properties'
import Spinner from 'component/generic/widget/Spinner'

const Container = styled.div`
  ${roundedRectangle};
  ${padded};

  position: relative;
  align-self: stretch;
  min-height: 5rem;
  border: dashed 3px ${({ theme }) => theme.color.grayLightest}
  padding: 1rem;
  opacity: ${({ loading }) => loading ? 0.4 : 1.0};
`

const SpinnerContainer = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: center;
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

const Placeholder = () => {
  return (
    <Container>
      <SpinnerContainer>
        <Spinner/>
      </SpinnerContainer>

      <Text width='80%'/>
      <Text width='65%' darker={true}/>
      <Text width='82%'/>
      <Text width='86%' darker={true}/>
      <Text width='70%'/>

      <br/>

      <Expander>
        <Text width='80%' darker={true}/>
        <Text width='64%' darker={true}/>
      </Expander>
      <Expander>
        <Text width='72%' darker={true}/>
        <Text width='79%' darker={true}/>
      </Expander>
      <Expander>
        <Text width='86%' darker={true}/>
        <Text width='80%' darker={true}/>
      </Expander>
    </Container>
  )
}

export default Placeholder
