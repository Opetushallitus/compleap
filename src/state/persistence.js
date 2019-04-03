/**
 * This is a mock implementation for persisting client state.
 * Here we persist state in local storage only.
 */

import { State } from 'xstate'
import * as R from 'ramda'
import { machine, PageState } from 'state/machine'
import { context } from 'state/context'

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

  const wasTransitioning = restoredState.matches(PageState.logout)

  const hasVersionMismatch = restoredState.context.version !== process.env.CONTEXT_VERSION

  if (hasVersionMismatch) {
    console.error('Restored state had stale context version. Resetting to initial state and context.')
    return State.from(machine.initialState, context)
  }

  if (containsFailedState) {
    console.warn('Restored state contained a failure. Resetting to initial state.')
    return State.from(machine.initialState, restoredState.context)
  }

  if (wasTransitioning) {
    console.warn('Restored state was in the middle of a transition. Resetting to initial state.')
    return State.from(machine.initialState, restoredState.context)
  }

  return restoredState
}
