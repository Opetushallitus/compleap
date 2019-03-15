import * as R from 'ramda'
import { InteractionEvent } from 'state/events'
import { Action } from 'state/context'

const State = Object.freeze({
  idle: 'idle',
  empty: 'empty',
  selected: 'selected'
})

const educationStates = {
  initial: State.idle,
  states: {
    [State.idle]: {
      on: {
        '': [
          { target: State.empty, cond: (ctx, _) => R.isEmpty(ctx.education.data) },
          { target: State.selected }
        ]
      }
    },
    [State.empty]: {
      on: {
        [InteractionEvent.SELECT_EDUCATION]: {
          target: State.selected,
          actions: Action.selectEducation
        }
      }
    },
    [State.selected]: { }
  }
}

export default educationStates
