import { Machine } from 'xstate'
import { actions, context } from 'state/context'
import services from 'state/services'
import { NavigationEvent } from 'state/events'
import interestsStates from 'state/interestsStates'
import educationStates from 'state/educationStates'
import recommendationStates from 'state/recommendationStates'

export const PageState = Object.freeze({
  lander: 'lander',
  profile: 'profile'
})

const SectionState = Object.freeze({
  education: 'education',
  interests: 'interests',
  recommendations: 'recommendations'
})

export const machine = Machine({
  id: 'main',
  strict: true,
  initial: PageState.lander,
  context,
  states: {
    [PageState.lander]: {
      on: {
        [NavigationEvent.LOGIN]: PageState.profile,
        [NavigationEvent.PROFILE]: PageState.profile
      }
    },
    [PageState.profile]: {
      type: 'parallel',
      states: {
        [SectionState.education]: { ...educationStates },
        [SectionState.interests]: { ...interestsStates },
        [SectionState.recommendations]: { ...recommendationStates }
      },
      on: {
        [NavigationEvent.HOME]: PageState.lander
      }
    }
  }
}, {
  services,
  actions
})
