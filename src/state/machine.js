import { Machine } from 'xstate'
import services from 'state/services'
import { actions, context } from 'state/context'

const PageState = Object.freeze({
  lander: 'lander',
  profile: 'profile',
  interests: 'interests'
})

const DataState = Object.freeze({
  idle: 'idle',
  pending: 'pending',
  success: 'success',
  failure: 'failure'
})

const NavigationEvent = Object.freeze({
  LOGIN: 'LOGIN',
  HOME: 'HOME',
  PROFILE: 'PROFILE'
})

const Service = Object.freeze({
  getInterestSuggestions: 'getInterestSuggestions'
})

const Action = Object.freeze({
  setInterestSuggestionsData: 'setInterestSuggestionsData',
  setInterestSuggestionsError: 'setInterestSuggestionsError'
})

const machine = Machine({
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
          initial: DataState.idle,
          states: {
            [DataState.idle]: { on: { '': DataState.pending } },
            [DataState.pending]: {
              invoke: {
                src: Service.getInterestSuggestions,
                onDone: {
                  target: DataState.success,
                  actions: Action.setInterestSuggestionsData
                },
                onError: {
                  target: DataState.failure,
                  actions: Action.setInterestSuggestionsError
                }
              }
            },
            [DataState.success]: { },
            [DataState.failure]: { }
          }
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

export {
  machine,
  PageState,
  NavigationEvent
}
