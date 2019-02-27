import { Machine } from 'xstate'

export default Machine({
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
