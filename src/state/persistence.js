import { State } from 'xstate'

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
  return restoredStateDef ? State.create(restoredStateDef) : undefined
}
