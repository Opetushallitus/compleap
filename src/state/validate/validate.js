import Ajv from 'ajv'
import * as R from 'ramda'
import selectEducationEventSchema from 'state/validate/schema/selectEducationEventSchema'
import selectEducationSpecifierEventSchema from 'state/validate/schema/selectEducationSpecifierEventSchema'
import removeEducationEventSchema from 'state/validate/schema/removeEducationEventSchema'
import { InteractionEvent } from 'state/events'

const ajv = new Ajv()

const check = (schema, data) => {
  const valid = ajv.validate(schema, data)

  if (!valid) {
    console.group('Validation error')
    console.error(`The following data and schema did not match:`, data, schema)
    console.error(`Error:`, ajv.errors)
    console.groupEnd()

    throw new Error('Invalid data')
  }
}

export const validateEvent = event => {
  const type = typeof event === 'string' ? event : event.type

  switch (type) {
    case InteractionEvent.SELECT_EDUCATION:
      return check(selectEducationEventSchema, event)
    case InteractionEvent.SELECT_EDUCATION_SPECIFIER:
      return check(selectEducationSpecifierEventSchema, event)
    case InteractionEvent.REMOVE_EDUCATION:
      return check(removeEducationEventSchema, event)
  }
}

export const validateModel = (model, schema) => check(schema, R.pick(Object.getOwnPropertyNames(model), model))
