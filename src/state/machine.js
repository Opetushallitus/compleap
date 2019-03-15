import { Machine } from 'xstate'
import { actions, context } from 'state/context'
import services from 'state/services'
import interestsStates from 'state/interestsStates'
import { NavigationEvent } from 'state/events'
import educationStates from 'state/educationStates'

export const PageState = Object.freeze({
  lander: 'lander',
  profile: 'profile'
})

const SectionState = Object.freeze({
  education: 'education',
  interests: 'interests'
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
        [SectionState.interests]: { ...interestsStates }
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
