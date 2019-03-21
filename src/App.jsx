import React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import GlobalStyle from 'ui/GlobalStyle'
import theme from 'ui/theme'
import { Context, state } from 'state/state'
import Router from 'component/Router'
import TopBar from 'component/TopBar'
import Footer from 'component/Footer'

const PageContainer = styled.div`
  position: relative;
  min-height: 100vh;
`

/**
 * For footer fixed to the bottom
 */
const ContentWrapper = styled.div`
  padding-bottom: ${({ theme }) => theme.layout.footerHeight}
`

const ContentContainer = styled.main`
  padding: 2rem 1rem;
`

const App = () => (
  <Context.Provider value={state}>
    <ThemeProvider theme={theme}>
      <PageContainer>
        <GlobalStyle/>
        <TopBar/>
        <ContentWrapper>
          <ContentContainer>
            <Router/>
          </ContentContainer>
        </ContentWrapper>
        <Footer/>
      </PageContainer>
    </ThemeProvider>
  </Context.Provider>
)

export default App
