import React from 'react'
import styled from 'styled-components'
import Box from 'component/generic/widget/Box'
import Spinner from 'component/generic/widget/Spinner'

const Container = styled(Box)`
  align-content: center;
`

const Content = styled.div`
  width: 100%;
  min-height: 15rem;
`

const Pending = () => (
  <Container align='center'>
    <Content>
      <Spinner/>
    </Content>
  </Container>
)

export default Pending
