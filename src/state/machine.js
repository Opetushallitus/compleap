import { Machine } from 'xstate'
import { Action, actions, context } from 'state/context'
import services, { Service } from 'state/services'
import { NavigationEvent, UserEvent } from 'state/events'
import loginStates from 'state/loginStates'
import interestsStates from 'state/interestsStates'
import unverifiedEducationStates from 'state/unverifiedEducationStates'
import recommendationStates from 'state/recommendationStates'

export const PageState = Object.freeze({
  lander: 'lander',
  login: 'login',
  logout: 'logout',
  profile: 'profile'
})

const SectionState = Object.freeze({
  education: 'education',
  interests: 'interests',
  recommendations: 'recommendations'
})

const EducationSubsectionState = Object.freeze({
  unverifiedEducation: 'unverifiedEducation'
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
        [SectionState.education]: {
          type: 'parallel',
          states: {
            [EducationSubsectionState.unverifiedEducation]: { ...unverifiedEducationStates }
          }
        },
        [SectionState.interests]: { ...interestsStates },
        [SectionState.recommendations]: { ...recommendationStates }
      }
    },
    [PageState.logout]: {
      invoke: {
        src: Service.clearSession,
        onDone: { actions: Action.reload },
        onError: { }
      }
    }
  },
  on: {
    [NavigationEvent.HOME]: PageState.lander,
    [NavigationEvent.PROFILE]: [
      { target: PageState.profile, cond: (ctx, _) => ctx.user.isLoggedIn },
      { target: PageState.login }
    ],
    [UserEvent.LOGOUT]: PageState.logout
  }
}, {
  services,
  actions
})
