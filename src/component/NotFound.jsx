import React from 'react'
import styled from 'styled-components'
import t from 'util/translate'
import Box from 'component/generic/widget/Box'
import Button from 'component/generic/widget/Button'
import { H1 } from 'ui/typography'

const Container = styled(Box)`
  align-content: center;
`

const Content = styled.div`
  width: 100%;
  min-height: 15rem;
`

const Divider = styled.hr`
  border: solid 1px ${({ theme }) => theme.color.grayLighter};
  background-color: ${({ theme }) => theme.color.grayLighter};
  color: ${({ theme }) => theme.color.grayLighter};
  margin: 1rem 20% 2rem 20%;
`

const NotFound = () => (
  <Container align='center'>
    <Content>
      <H1>{t`Sivua ei löytynyt`}</H1>
      <Divider/>
      <Button onClick={() => window.location.reload()}>{t`Palaa takaisin aloitussivulle`}</Button>
    </Content>
  </Container>
)

NotFound.propTypes = {}

export default NotFound
