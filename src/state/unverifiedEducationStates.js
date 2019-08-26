import { InteractionEvent } from 'state/events'
import { Action } from 'state/context'
import { Service } from 'state/services'
import { namespaceSubstate } from 'util/machineStateHelper'
import { canHaveSpecifier, isVocational } from 'util/educationHelper'

const namespaced = namespaceSubstate('EducationPickerState')
const targetById = id => `#${namespaced(id)}`

export const EducationPickerState = Object.freeze({
  init: 'init',
  formCollapsed: 'formCollapsed',
  formOpen: 'formOpen',
  selectionEmpty: 'selectionEmpty',
  selectionSet: 'selectionSet',
  checkIfSelectionReady: 'checkIfSelectionReady',
  specifierRequired: 'specifierRequired',
  selectionReady: 'selectionReady',
  done: 'done',
  getCompetences: 'getCompetences',
  failure: 'failure'
})

const unverifiedEducationStates = {
  initial: EducationPickerState.init,
  states: {
    [EducationPickerState.init]: {
      on: {
        '': [
          {
            target: EducationPickerState.formCollapsed,
            cond: (ctx, _) => ctx.user.isLoggedIn && ctx.user.id
          },
          { target: EducationPickerState.formOpen }
        ]
      }
    },
    [EducationPickerState.formCollapsed]: {
      onEntry: Action.clearUnverifiedEducationSelection,
      on: {
        [InteractionEvent.BEGIN_EDUCATION_INPUT]: EducationPickerState.formOpen
      }
    },
    [EducationPickerState.formOpen]: {
      initial: EducationPickerState.selectionEmpty,
      states: {
        [EducationPickerState.selectionEmpty]: {
          on: {
            [InteractionEvent.SELECT_EDUCATION]: {
              target: EducationPickerState.selectionSet,
              actions: Action.selectUnverifiedEducationLevel
            }
          }
        },
        [EducationPickerState.selectionSet]: {
          id: namespaced(EducationPickerState.selectionSet),
          initial: EducationPickerState.checkIfSelectionReady,
          states: {
            [EducationPickerState.checkIfSelectionReady]: {
              on: {
                '': [
                  {
                    target: EducationPickerState.specifierRequired,
                    cond: (ctx, _) => {
                      const { selection } = ctx.education.data
                      return canHaveSpecifier(selection.level.id) && !selection.specifier
                    }
                  },
                  { target: EducationPickerState.selectionReady }
                ]
              }
            },
            [EducationPickerState.specifierRequired]: {
              on: {
                [InteractionEvent.SELECT_EDUCATION_SPECIFIER]: {
                  target: targetById(EducationPickerState.selectionSet),
                  actions: Action.selectUnverifiedEducationSpecifier
                },
                [InteractionEvent.SELECT_EDUCATION]: {
                  target: targetById(EducationPickerState.selectionSet),
                  actions: Action.selectUnverifiedEducationLevel
                }
              }
            },
            [EducationPickerState.selectionReady]: {
              on: {
                [InteractionEvent.SELECT_EDUCATION]: {
                  target: targetById(EducationPickerState.selectionSet),
                  actions: [Action.selectUnverifiedEducationLevel, Action.clearUnverifiedEducationSpecifier]
                },
                [InteractionEvent.SELECT_EDUCATION_SPECIFIER]: {
                  target: targetById(EducationPickerState.selectionSet),
                  actions: Action.selectUnverifiedEducationSpecifier
                },
                [InteractionEvent.CONFIRM_EDUCATION]: {
                  target: targetById(EducationPickerState.done)
                }
              }
            }
          }
        }
      },
      on: {
        [InteractionEvent.CANCEL_EDUCATION]: EducationPickerState.formCollapsed
      }
    },
    [EducationPickerState.done]: {
      id: namespaced(EducationPickerState.done),
      invoke: {
        src: Service.mapEducationClassToLearningOpportunityCode,
        onDone: [{
          target: EducationPickerState.getCompetences,
          actions: Action.addUnverifiedEducation,
          cond: (ctx, _) => isVocational(ctx.education.data.selection.level.id)
        }, {
          target: EducationPickerState.formCollapsed,
          actions: Action.addUnverifiedEducation
        }],
        onError: {
          target: EducationPickerState.failure,
          actions: Action.setEducationError
        }
      }
    },
    [EducationPickerState.getCompetences]: {
      invoke: {
        src: Service.getCompetencesForUnverifiedEducation,
        onDone: {
          target: EducationPickerState.formCollapsed,
          actions: Action.addUnverifiedEducationCompetenceData
        },
        onError: {
          target: EducationPickerState.failure,
          actions: Action.setUnverifiedEducationCompetenceError
        }
      }
    },
    [EducationPickerState.failure]: {
      id: namespaced(EducationPickerState.failure),
      on: { '': EducationPickerState.formCollapsed }
    }
  },
  on: {
    [InteractionEvent.REMOVE_EDUCATION]: {
      actions: [
        Action.removeUnverifiedEducation,
        Action.removeUnverifiedEducationCompetenceData
      ]
    }
  }
}

export default unverifiedEducationStates
