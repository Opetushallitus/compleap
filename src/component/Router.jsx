import React, { useContext } from 'react'
import { Context } from 'state/state'
import Lander from 'component/Lander'
import Profile from 'component/Profile'
import useObservable from 'component/generic/hook/useObservable'
import { State } from 'state/machine'

const pages = [
  { state: State.lander, view: Lander },
  { state: State.profile, view: Profile }
]

const resolve = state => {
  const page = pages.find(page => state.matches(page.state))
  if (!page) throw new Error(`Could not resolve view for state ${state.value}`)
  return page.view
}

const Router = () => {
  const context = useContext(Context)
  const state = useObservable(context, { skipDuplicates: (prev, next) => next.matches(prev.toStrings()[0]) })
  const View = resolve(state)

  console.debug(`Rendering view ${View.displayName}`)

  return <View/>
}

export default Router
