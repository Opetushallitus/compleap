import React from 'react'
import { interpret } from 'xstate'
import Atom from 'bacon.atom'
import machine from 'state/machine'

export const Context = React.createContext()

export const state = Atom()

const service = interpret(machine)
  .onTransition(s => state.set(s))
  .start()

export const dispatch = v => service.send(v)
