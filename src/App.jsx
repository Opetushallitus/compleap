import React from 'react'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from 'ui/GlobalStyle'
import theme from 'ui/theme'
import Lander from 'component/Lander'

const App = () => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyle/>
      <Lander/>
    </React.Fragment>
  </ThemeProvider>
)

export default App
