import { Machine } from 'xstate'
import { Action, actions, context } from 'state/context'
import services, { Service } from 'state/services'
import { InteractionEvent, NavigationEvent, UserEvent } from 'state/events'
import loginStates from 'state/loginStates'
import interestsStates from 'state/interestsStates'
import verifiedEducationStates from 'state/verifiedEducationStates'
import unverifiedEducationStates from 'state/unverifiedEducationStates'
import recommendationStates from 'state/recommendationStates'
import userStates from 'state/userStates'
import verifiedEducationCompetenceStates from 'state/verifiedEducationCompetenceStates'

export const PageState = Object.freeze({
  lander: 'lander',
  login: 'login',
  logout: 'logout',
  profile: 'profile'
})

const SectionState = Object.freeze({
  user: 'user',
  education: 'education',
  interests: 'interests',
  recommendations: 'recommendations'
})

const EducationSubsectionState = Object.freeze({
  verifiedEducation: 'verifiedEducation',
  unverifiedEducation: 'unverifiedEducation',
  verifiedEducationCompetences: 'verifiedEducationCompetences'
})

export const machine = Machine({
  id: 'main',
  strict: true,
  initial: PageState.lander,
  context,
  states: {
    [PageState.lander]: {
      on: {
        [UserEvent.ENTER_NAME]: {
          target: PageState.login,
          actions: Action.enterName,
          cond: (_, event) => event.data.name && event.data.name.length > 0 && event.data.name.length < 25
        }
      }
    },
    [PageState.login]: { ...loginStates },
    [PageState.profile]: {
      type: 'parallel',
      states: {
        [SectionState.user]: { ...userStates },
        [SectionState.education]: {
          type: 'parallel',
          states: {
            [EducationSubsectionState.verifiedEducation]: { ...verifiedEducationStates },
            [EducationSubsectionState.unverifiedEducation]: { ...unverifiedEducationStates },
            [EducationSubsectionState.verifiedEducationCompetences]: { ...verifiedEducationCompetenceStates }
          }
        },
        [SectionState.interests]: { ...interestsStates },
        [SectionState.recommendations]: { ...recommendationStates }
      },
      on: {
        [InteractionEvent.TOGGLE_COMPETENCE]: { actions: Action.toggleCompetenceSelection }
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
    [UserEvent.LOGOUT]: PageState.logout,
    [UserEvent.SELECT_LANGUAGE]: { actions: Action.selectLanguage }
  }
}, {
  services,
  actions
})
