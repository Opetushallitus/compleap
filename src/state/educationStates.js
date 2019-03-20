import { InteractionEvent } from 'state/events'
import { Action } from 'state/context'

const isVocational = id => id === '2'
const targetById = id => `#${id}`

export const EducationPickerState = Object.freeze({
  formCollapsed: 'formCollapsed',
  formOpen: 'formOpen',
  selectionEmpty: 'selectionEmpty',
  selectionSet: 'selectionSet',
  checkIfSelectionReady: 'checkIfSelectionReady',
  specifierRequired: 'specifierRequired',
  selectionReady: 'selectionReady',
  done: 'done'
})

const educationStates = {
  initial: EducationPickerState.formOpen,
  states: {
    [EducationPickerState.formCollapsed]: {
      onEntry: Action.clearEducationSelection,
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
              actions: Action.selectEducation
            }
          }
        },
        [EducationPickerState.selectionSet]: {
          id: EducationPickerState.selectionSet,
          initial: EducationPickerState.checkIfSelectionReady,
          states: {
            [EducationPickerState.checkIfSelectionReady]: {
              on: {
                '': [
                  {
                    target: EducationPickerState.specifierRequired,
                    cond: (ctx, _) => {
                      const { selection } = ctx.education.data
                      return isVocational(selection.level.id) && !selection.specifier
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
                  actions: Action.selectEducationSpecifier
                },
                [InteractionEvent.SELECT_EDUCATION]: {
                  target: targetById(EducationPickerState.selectionSet),
                  actions: Action.selectEducation
                }
              }
            },
            [EducationPickerState.selectionReady]: {
              on: {
                [InteractionEvent.SELECT_EDUCATION]: {
                  target: targetById(EducationPickerState.selectionSet),
                  actions: [Action.selectEducation, Action.clearEducationSpecifier]
                },
                [InteractionEvent.SELECT_EDUCATION_SPECIFIER]: {
                  target: targetById(EducationPickerState.selectionSet),
                  actions: Action.selectEducationSpecifier
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
      id: EducationPickerState.done,
      on: {
        '': [
          { target: EducationPickerState.formCollapsed, actions: Action.addEducation }
        ]
      }
    }
  },
  on: {
    [InteractionEvent.REMOVE_EDUCATION]: {
      actions: Action.removeEducation
    }
  }
}

export default educationStates
