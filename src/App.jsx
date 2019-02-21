import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from 'ui/GlobalStyle'
import theme from 'ui/theme'
import { Context, state } from 'state/state'
import Router from 'component/Router'

const App = () => (
  <Context.Provider value={state}>
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyle/>
        <Router/>
      </React.Fragment>
    </ThemeProvider>
  </Context.Provider>
)

export default App
