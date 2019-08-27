import React from 'react'
import createRendererWithTheme from 'test/util/createRendererWithTheme'

const mockState = formState => jest.doMock('state/state', () => {
  const Atom = require('bacon.atom')
  const React = require('react')

  const state = Atom({
    context: {
      user: {
        language: 'fi'
      },
      interests: {
        data: [],
        error: undefined
      },
      education: {
        data: {
          unverifiedEducations: [{
            id: 'd17ebd27-c42c-416a-954c-2eb42f9436ed',
            level: { id: '1' }
          }, {
            id: 'a24d7a2e-2922-4f60-9d12-c1285ead6ddd',
            level: { id: '2' },
            specifier: { id: '0214' },
            code: 'koulutus_321101'
          }],
          selection: undefined
        }
      }
    },
    value: {
      profile: {
        education: {
          unverifiedEducation: formState
        }
      }
    }
  })

  return {
    Context: React.createContext(state),
    state: Atom(state)
  }
})

describe('Education', () => {
  beforeAll(() => {
    global.console = Object.assign({}, global.console, { warn: jest.fn() }) // Suppress logging
  })

  beforeEach(() => {
    jest.clearAllMocks()
    jest.mock('component/educations/unverified-educations-list/fragment/Competences', () => () => null)
  })

  it('should show added educations', () => {
    let Education
    mockState('formCollapsed')
    jest.isolateModules(() => { Education = require('./Educations').default })

    const renderedJSON = createRendererWithTheme(<Education/>).toJSON()
    expect(renderedJSON).toMatchSnapshot()
  })
})
