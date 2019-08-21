import React, { useContext } from 'react'
import styled from 'styled-components'
import { Context } from 'state/state'
import Box from 'component/generic/widget/Box'
import useObservable from 'component/generic/hook/useObservable'
import EducationInput from 'component/login/EducationInput'
import BackgroundSelection from 'component/login/BackgroundSelection'

const Contents = styled(Box)`
  & > * {
    margin-bottom: 1rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
`

const getStepComponent = (step) => {
  switch (step) {
    case 'chooseBackground':
      return BackgroundSelection
    case 'chooseProfile':
      return EducationInput
    default:
      console.warn(`Invalid login step: ${step}`)
      return () => null
  }
}

const Login = () => {
  const context$ = useContext(Context)
  const step = useObservable(context$, { path: ['value', 'login'] })
  const Step = getStepComponent(step)

  return (
    <Contents align='center'>
      <Step/>
    </Contents>
  )
}

Login.displayName = 'Login'

export default Login
