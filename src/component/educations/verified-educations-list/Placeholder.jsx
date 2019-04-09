import React from 'react'
import styled from 'styled-components'
import { padded, roundedRectangle } from 'ui/properties'
import Spinner from 'component/generic/widget/Spinner'

const Container = styled.div`
  position: relative;
  align-self: stretch;
  min-height: 5rem;
  text-align: left;
  margin-bottom: 2rem;
`

const Title = styled.div`
  margin-bottom: 2rem;
`

const List = styled.div`
  ${roundedRectangle};
  ${padded};
  
  border: dashed 3px ${({ theme }) => theme.color.grayLightest}
  padding: 1rem;
  opacity: ${({ loading }) => loading ? 0.4 : 1.0};
`

const SpinnerContainer = styled.div`
  position: absolute;
  width: 100%;
  margin-top: 4rem;
  display: flex;
  justify-content: center;
`

const Unit = styled.div`
  display: flex;
  justify-content: space-between;
  height: 2.5rem;
`

const Text = styled.div`
  display: inline-block;
  border-top: solid 4px ${({ theme, darker }) => darker ? theme.color.grayLighter : theme.color.grayLightest};
  width: ${({ width }) => width}
  margin: 0.5rem 0;
`

const Icons = styled.div``

const Icon = styled.div`
  display: inline-block;
  margin-left: 1rem;
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.color.grayLightest};
`

const Placeholder = () => {
  return (
    <Container>
      <SpinnerContainer>
        <Spinner/>
      </SpinnerContainer>

      <Title>
        <Text width='75%' darker={true}/>
        <Text width='55%'/>
        <Text width='87%'/>
      </Title>

      <List>
        <Unit>
          <Text width='80%'/>
          <Icons>
            <Icon/>
            <Icon/>
          </Icons>
        </Unit>
        <Unit>
          <Text width='65%' darker={true}/>
          <Icons>
            <Icon/>
            <Icon/>
          </Icons>
        </Unit>
        <Unit>
          <Text width='82%'/>
          <Icons>
            <Icon/>
            <Icon/>
          </Icons>
        </Unit>
        <Unit>
          <Text width='86%' darker={true}/>
          <Icons>
            <Icon/>
            <Icon/>
          </Icons>
        </Unit>
        <Unit>
          <Text width='70%'/>
          <Icons>
            <Icon/>
            <Icon/>
          </Icons>
        </Unit>
      </List>
    </Container>
  )
}

export default Placeholder
