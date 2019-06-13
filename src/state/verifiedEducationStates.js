import { Service } from 'state/services'
import { Action } from 'state/context'
import { InteractionEvent } from 'state/events'

const State = Object.freeze({
  idle: 'idle',
  nop: 'nop',
  pending: 'pending',
  success: 'success',
  failure: 'failure'
})

const verifiedEducationStates = {
  initial: State.idle,
  states: {
    [State.idle]: {
      on: {
        '': [
          { target: State.nop, cond: (ctx, _) => !ctx.user.isLoggedIn || !ctx.user.id },
          { target: State.pending, cond: (ctx, _) => ctx.education.data.verifiedEducations.length === 0 },
          { target: State.success }
        ]
      }
    },
    [State.nop]: { },
    [State.pending]: {
      invoke: {
        src: Service.getVerifiedEducations,
        onDone: {
          target: State.success,
          actions: Action.setVerifiedEducationData
        },
        onError: {
          target: State.failure,
          actions: Action.setEducationError
        }
      }
    },
    [State.success]: {
      invoke: {
        src: Service.getCompetencesForVerifiedEducation,
        onDone: {
          actions: Action.setCompetenceDataForVerifiedEducation
        }
      },
      on: {
        [InteractionEvent.LIKE_EDUCATION_UNIT]: { actions: Action.likeEducationUnit },
        [InteractionEvent.DISLIKE_EDUCATION_UNIT]: { actions: Action.dislikeEducationUnit }
      }
    },
    [State.failure]: { }
  }
}

export default verifiedEducationStates
