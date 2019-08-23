import { UserEvent } from 'state/events'
import { Action } from 'state/context'

const State = Object.freeze({
  idle: 'idle'
})

const userStates = {
  initial: State.idle,
  states: {
    [State.idle]: {
      on: {
        [UserEvent.SET_IMAGE]: { actions: Action.setProfileImageURL }
      }
    }
  }
}

export default userStates
