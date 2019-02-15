import React from 'react'
import { create } from 'react-test-renderer'

import Profile from 'component/Profile'

describe('Profile', () => {
  it('should render correctly', () => {
    const renderedJSON = create(<Profile/>).toJSON()
    expect(renderedJSON).toMatchSnapshot()
  })
})
