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
      },
      education: {
        data: {
          unverifiedEducations: [],
          selection: undefined
        }
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

describe('Interests', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should show loading indicator when fetching suggestions', () => {
    let Interests
    mockState('pending')
    jest.isolateModules(() => { Interests = require('./Interests').default })

    const renderedJSON = createRendererWithTheme(<Interests/>).toJSON()
    expect(renderedJSON).toMatchSnapshot()
  })

  it('should show interest suggestions when fetched successfully', () => {
    let Interests
    mockState('success')
    jest.isolateModules(() => { Interests = require('./Interests').default })

    const renderedJSON = createRendererWithTheme(<Interests/>).toJSON()
    expect(renderedJSON).toMatchSnapshot()
  })

  it('should show error when fetching interest suggestions failed', () => {
    let Interests
    mockState('failure')
    jest.isolateModules(() => { Interests = require('./Interests').default })

    const renderedJSON = createRendererWithTheme(<Interests/>).toJSON()
    expect(renderedJSON).toMatchSnapshot()
  })
})
