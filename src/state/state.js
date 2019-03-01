import React from 'react'
import { interpret } from 'xstate'
import Atom from 'bacon.atom'

import { machine } from 'state/machine'
import { context } from 'state/context'
import { logEvent, logState } from 'util/log'

export const state = Atom(context)
export const Context = React.createContext()

const service = interpret(machine)
  .onTransition(s => state.set(s))
  .start()

export const dispatch = event => {
  logEvent(event)
  service.send(event)
}

state.onValue(logState)
