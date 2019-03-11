import React from 'react'
import createRendererWithTheme from 'test/util/createRendererWithTheme'

const mockState = queryStatus => jest.doMock('state/state', () => {
  const Atom = require('bacon.atom')
  const React = require('react')

  const state = Atom({
    context: {
      interests: {
        data: [{
          topic: 'Autot',
          id: '1',
          selected: true,
          subtopics: [{
            topic: 'Virittely ja korjaaminen',
            id: '2',
            selected: false
          }]
        }],
        error: undefined
      }
    },
    value: {
      profile: {
        interests: queryStatus
      }
    }
  })

  return {
    Context: React.createContext(state)
  }
})

describe('Profile', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should show loading indicator when fetching interest suggestions', () => {
    let Profile
    mockState('pending')
    jest.isolateModules(() => { Profile = require('./Profile').default })

    const renderedJSON = createRendererWithTheme(<Profile/>).toJSON()
    expect(renderedJSON).toMatchSnapshot()
  })

  it('should show interest suggestions when fetched successfully', () => {
    let Profile
    mockState('success')
    jest.isolateModules(() => { Profile = require('./Profile').default })

    const renderedJSON = createRendererWithTheme(<Profile/>).toJSON()
    expect(renderedJSON).toMatchSnapshot()
  })

  it('should show error when fetching interest suggestions failed', () => {
    let Profile
    mockState('failure')
    jest.isolateModules(() => { Profile = require('./Profile').default })

    const renderedJSON = createRendererWithTheme(<Profile/>).toJSON()
    expect(renderedJSON).toMatchSnapshot()
  })
})
