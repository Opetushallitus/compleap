import React from 'react'
import { interpret } from 'xstate'
import Atom from 'bacon.atom'

import { machine } from 'state/machine'
import { logEvent, logState } from 'util/log'

export const Context = React.createContext()

export const state = Atom()

const service = interpret(machine)
  .onTransition(s => state.set(s))
  .start()

export const dispatch = event => {
  logEvent(event)
  service.send(event)
}

state.onValue(logState)
