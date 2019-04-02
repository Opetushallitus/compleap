import { Action } from 'state/context'
import { UserEvent } from 'state/events'

const State = Object.freeze({
  idle: 'idle',
  loggedOut: 'loggedOut',
  loggedIn: 'loggedIn'
})

const loginStates = {
  initial: State.loggedOut,
  states: {
    [State.idle]: {
      on: {
        '': [
          { target: State.loggedIn, cond: (ctx, _) => ctx.user.isLoggedIn },
          { target: State.loggedOut }
        ]
      }
    },
    [State.loggedOut]: {
      on: {
        [UserEvent.LOGIN]: {
          actions: Action.logIn
        }
      }
    },
    [State.loggedIn]: { }
  }
}

export default loginStates
