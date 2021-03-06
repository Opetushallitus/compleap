import { Action } from 'state/context'
import { InteractionEvent } from 'state/events'
import { Service } from 'state/services'

const State = Object.freeze({
  idle: 'idle',
  pending: 'pending',
  success: 'success',
  failure: 'failure'
})

const interestsStates = {
  initial: State.idle,
  states: {
    [State.idle]: {
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
        [InteractionEvent.TOGGLE_INTEREST]: {
          actions: Action.toggleInterestSelection
        }
      }
    },
    [State.failure]: { }
  }
}

export default interestsStates
