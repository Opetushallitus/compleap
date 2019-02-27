import { Machine } from 'xstate'

/**
 * Enum for states.
 * @readonly
 * @enum {string}
 */
const State = Object.freeze({
  lander: 'lander',
  profile: 'profile'
})

/**
 * Enum for navigation events.
 * @readonly
 * @enum {string}
 */
const NavigationEvent = Object.freeze({
  LOGIN: 'LOGIN',
  HOME: 'HOME',
  PROFILE: 'PROFILE'
})

const machine = Machine({
  initial: State.lander,
  states: {
    [State.lander]: {
      on: {
        [NavigationEvent.LOGIN]: State.profile,
        [NavigationEvent.PROFILE]: State.profile
      }
    },
    [State.profile]: {
      on: {
        [NavigationEvent.HOME]: State.lander
      }
    }
  }
})

export {
  machine,
  State,
  NavigationEvent
}
