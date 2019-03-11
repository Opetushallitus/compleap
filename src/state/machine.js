import { Machine } from 'xstate'
import { actions, context } from 'state/context'
import services from 'state/services'
import interestsStates from 'state/interestsStates'

export const PageState = Object.freeze({
  lander: 'lander',
  profile: 'profile',
  interests: 'interests'
})

export const NavigationEvent = Object.freeze({
  LOGIN: 'LOGIN',
  HOME: 'HOME',
  PROFILE: 'PROFILE'
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
        [PageState.interests]: {
          ...interestsStates
        }
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
