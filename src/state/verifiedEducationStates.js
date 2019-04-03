const VerifiedEducationState = Object.freeze({
  idle: 'idle'
})

const unverifiedEducationStates = {
  initial: VerifiedEducationState.idle,
  states: {
    [VerifiedEducationState.idle]: { }
  }
}

export default unverifiedEducationStates
