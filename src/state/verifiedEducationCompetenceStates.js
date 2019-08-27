import { Service } from 'state/services'
import { Action } from 'state/context'
import { InternalEvent } from 'state/events'

const State = Object.freeze({
  idle: 'idle',
  nop: 'nop',
  competencesPending: 'competencesPending',
  competencesSuccess: 'competencesSuccess',
  competencesFailure: 'competencesFailure'
})

const verifiedEducationCompetenceStates = {
  initial: State.idle,
  states: {
    [State.idle]: {
      on: {
        '': [
          { target: State.nop, cond: (ctx, _) => !ctx.user.isLoggedIn || !ctx.user.id },
          { target: State.competencesSuccess, cond: (ctx, _) => Object.keys(ctx.competences.data.fromVerifiedEducation).length > 0 }
        ],
        [InternalEvent.GET_COMPETENCES_FOR_VERIFIED_EDUCATION]: {
          target: State.competencesPending
        }
      }
    },
    [State.nop]: { },
    [State.competencesPending]: {
      invoke: {
        src: Service.getCompetencesForVerifiedEducation,
        onDone: {
          target: State.competencesSuccess,
          actions: Action.setVerifiedEducationCompetenceData
        },
        onError: {
          target: State.competencesFailure,
          actions: Action.setVerifiedEducationCompetenceError
        }
      }
    },
    [State.competencesSuccess]: { },
    [State.competencesFailure]: { }
  }
}

export default verifiedEducationCompetenceStates
