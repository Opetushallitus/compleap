import React from 'react'
import { interpret } from 'xstate'
import Atom from 'bacon.atom'

import { machine } from 'state/machine'
import { context } from 'state/context'
import { logEvent, logState } from 'util/log'
import { persist, restore } from 'state/persistence'

export const state = Atom(context)
export const Context = React.createContext()

const restoredState = restore()

const service = interpret(machine)
  .onTransition(s => state.set(s))
  .start(restoredState)

export const dispatch = event => {
  logEvent(event)
  validateEvent(event)
  service.send(event)
}

state.onValue(logState)
state.onValue(persist)
