import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from 'polished'
import { padded, rounded, roundedRectangle } from 'ui/properties'
import Spinner from 'component/generic/widget/Spinner'

const ColorBrightnessOffsetFactor = 0.01

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
  
  border: dashed 3px ${({ theme }) => theme.color.grayLighter}
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

const Tag = styled.div`
  ${rounded};
  
  display: inline-block;
  width: ${({ width }) => width};
  height: 1rem;
  margin: 0.25rem 0.5rem;
  background-color: ${({ theme, darker }) => darker
    ? darken(ColorBrightnessOffsetFactor, theme.color.grayLighter)
    : lighten(ColorBrightnessOffsetFactor, theme.color.grayLighter)};
`

const Text = styled.div`
  display: inline-block;
  border-top: solid 4px ${({ theme, darker }) => darker
    ? darken(ColorBrightnessOffsetFactor, theme.color.grayLighter)
    : lighten(ColorBrightnessOffsetFactor, theme.color.grayLighter)};
  width: ${({ width }) => width}
  margin: 0.5rem 0;
`

const Placeholder = () => {
  return (
    <Container>
      <SpinnerContainer>
        <Spinner/>
      </SpinnerContainer>

      <Title>
        <Text width='55%' darker={true}/>
        <Text width='77%'/>
        <Text width='65%'/>
      </Title>

      <List>
        <Tag width='2rem' darker={true}/>
        <Tag width='3rem'/>
        <Tag width='5rem'/>
        <Tag width='4rem'/>
        <Tag width='3rem' darker={true}/>
        <Tag width='2rem'/>
        <Tag width='4rem'/>
        <Tag width='3rem'/>
        <Tag width='5rem'/>
        <Tag width='4rem' darker={true}/>
        <Tag width='2rem'/>
        <Tag width='3rem'/>
        <Tag width='5rem'/>
        <Tag width='4rem'/>
        <Tag width='3rem'/>
        <Tag width='4rem'/>
        <Tag width='3rem' darker={true}/>
        <Tag width='4rem'/>
        <Tag width='3rem'/>
        <Tag width='2rem'/>
        <Tag width='5rem'/>
        <Tag width='4rem'/>
      </List>
    </Container>
  )
}

export default Placeholder
