import { Service } from 'state/services'
import { Action } from 'state/context'
import { InternalEvent } from 'state/events'

const State = Object.freeze({
  idle: 'idle',
  nop: 'nop',
  pending: 'pending',
  success: 'success',
  failure: 'failure'
})

const verifiedEducationCompetenceStates = {
  initial: State.idle,
  states: {
    [State.idle]: {
      on: {
        '': [
          { target: State.nop, cond: (ctx, _) => !ctx.user.isLoggedIn || !ctx.user.id },
          { target: State.success, cond: (ctx, _) => Object.keys(ctx.competences.data.fromVerifiedEducation).length > 0 }
        ],
        [InternalEvent.GET_COMPETENCES_FOR_VERIFIED_EDUCATION]: {
          target: State.pending
        }
      }
    },
    [State.nop]: { },
    [State.pending]: {
      invoke: {
        src: Service.getCompetencesForVerifiedEducation,
        onDone: {
          target: State.success,
          actions: Action.setVerifiedEducationCompetenceData
        },
        onError: {
          target: State.failure,
          actions: Action.setVerifiedEducationCompetenceError
        }
      }
    },
    [State.success]: { },
    [State.failure]: { }
  }
}

export default verifiedEducationCompetenceStates
