import { Action } from 'state/context'
import { UserEvent } from 'state/events'

const State = Object.freeze({
  chooseBackground: 'chooseBackground',
  chooseProfile: 'chooseProfile'
})

const loginStates = {
  initial: State.chooseBackground,
  states: {
    [State.chooseBackground]: {
      on: {
        [UserEvent.SELECT_BACKGROUND]: { target: State.chooseProfile },
        [UserEvent.LOGIN]: { actions: Action.logIn }
      }
    },
    [State.chooseProfile]: {
      on: {
        [UserEvent.SELECT_PROFILE]: { actions: Action.selectProfile },
        [UserEvent.LOGIN]: { actions: Action.logIn, cond: (ctx, _) => ctx.user.profileId }
      }
    }
  }
}

export default loginStates
