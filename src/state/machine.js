import { Machine } from 'xstate'
import { actions, context } from 'state/context'
import services from 'state/services'
import { NavigationEvent } from 'state/events'
import loginStates from 'state/loginStates'
import interestsStates from 'state/interestsStates'
import educationStates from 'state/educationStates'
import recommendationStates from 'state/recommendationStates'

export const PageState = Object.freeze({
  lander: 'lander',
  login: 'login',
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
    [PageState.lander]: { },
    [PageState.login]: { ...loginStates },
    [PageState.profile]: {
      type: 'parallel',
      states: {
        [SectionState.education]: { ...educationStates },
        [SectionState.interests]: { ...interestsStates },
        [SectionState.recommendations]: { ...recommendationStates }
      }
    }
  },
  on: {
    [NavigationEvent.HOME]: PageState.lander,
    [NavigationEvent.PROFILE]: [
      { target: PageState.profile, cond: (ctx, _) => ctx.user.isLoggedIn },
      { target: PageState.login }
    ]
  }
}, {
  services,
  actions
})
