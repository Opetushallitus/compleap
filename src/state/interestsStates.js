import { Action } from 'state/context'

const State = Object.freeze({
  idle: 'idle',
  pending: 'pending',
  success: 'success',
  failure: 'failure'
})

const Service = Object.freeze({
  getInterestSuggestions: 'getInterestSuggestions'
})

const interestsStates = {
  initial: State.idle,
  states: {
    idle: {
      on: {
        '': [
          { target: State.pending, cond: (ctx, _) => ctx.interests.data.length === 0 },
          { target: State.success }
        ]
      }
    },
    [State.pending]: {
      invoke: {
        src: Service.getInterestSuggestions,
        onDone: {
          target: State.success,
          actions: Action.setInterestsData
        },
        onError: {
          target: State.failure,
          actions: Action.setInterestsError
        }
      }
    },
    [State.success]: {
      on: {
        TOGGLE: {
          actions: Action.toggleInterestSelection
        }
      }
    },
    [State.failure]: { }
  }
}

export default interestsStates
