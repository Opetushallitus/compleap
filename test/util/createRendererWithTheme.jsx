import React from 'react'
import { create } from 'react-test-renderer'
import { ThemeProvider } from 'styled-components'

import theme from 'ui/theme'

export default Component => {
  return create(
    <ThemeProvider theme={theme}>
      {Component}
    </ThemeProvider>
  )
}
