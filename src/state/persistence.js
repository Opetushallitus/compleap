import { State } from 'xstate'
import * as R from 'ramda'
import { machine } from 'state/machine'

export const persist = state => {
  const jsonState = JSON.stringify(state)

  try {
    window.localStorage.setItem('app-state', jsonState)
  } catch (e) {
    console.error(e)
  }
}

export const restore = () => {
  const restoredStateDef = JSON.parse(window.localStorage.getItem('app-state'))
  if (!restoredStateDef) return undefined

  const restoredState = State.create(restoredStateDef)
  const containsFailedState = restoredState.toStrings()
    .map(R.split('.'))
    .map(R.last)
    .includes('failure')

  if (containsFailedState) {
    console.warn('Restored state contained a failure. Resetting to initial state.')
    return State.from(machine.initialState, restoredState.context)
  }

  return restoredState
}
