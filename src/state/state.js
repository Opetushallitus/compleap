import React from 'react'
import { Machine, interpret } from 'xstate'
import Atom from 'bacon.atom'

export const dispatch = v => service.send(v)

const machine = Machine({
  initial: 'lander',
  states: {
    lander: {
      on: {
        LOGIN: 'profile',
        PROFILE: 'profile'
      }
    },
    profile: {
      on: {
        HOME: 'lander'
      }
    }
  }
})

export const state = Atom()

export const service = interpret(machine)
  .onTransition(s => state.set(s))
  .start()

export const Context = React.createContext()
