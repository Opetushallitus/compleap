import { Service } from 'state/services'
import { Action } from 'state/context'

const State = Object.freeze({
  idle: 'idle',
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
          { target: State.pending, cond: (ctx, _) => ctx.education.data.verifiedEducations.length === 0 },
          { target: State.success }
        ]
      }
    },
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
    [State.success]: { },
    [State.failure]: { }
  }
}

export default verifiedEducationStates
