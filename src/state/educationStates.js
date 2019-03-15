import * as R from 'ramda'
import { InteractionEvent } from 'state/events'
import { Action } from 'state/context'

const isVocational = id => id === '2'
const targetById = id => `#${id}`

const State = Object.freeze({
  idle: 'idle',
  empty: 'empty',
  selected: 'selected',
  specifierRequired: 'specifierRequired',
  ready: 'ready',
  done: 'done'
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
    [State.selected]: {
      id: State.selected,
      initial: State.idle,
      states: {
        [State.idle]: {
          on: {
            '': [
              { target: State.specifierRequired, cond: (ctx, _) => isVocational(ctx.education.data.id) },
              { target: State.ready }
            ]
          }
        },
        [State.specifierRequired]: {
          on: {
            [InteractionEvent.SELECT_EDUCATION]: {
              target: targetById(State.selected),
              actions: Action.selectEducation
            }
          }
        },
        [State.ready]: {
          on: {
            [InteractionEvent.SELECT_EDUCATION]: {
              target: targetById(State.selected),
              actions: Action.selectEducation
            }
          }
        }
      }
    },
    [State.done]: {}
  }
}

export default educationStates
