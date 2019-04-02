import React, { useContext } from 'react'
import { Context } from 'state/state'
import Lander from 'component/Lander'
import Profile from 'component/Profile'
import Login from 'component/Login'
import NotFound from 'component/NotFound'
import useObservable from 'component/generic/hook/useObservable'
import { PageState } from 'state/machine'

const pages = [
  { state: PageState.lander, view: Lander },
  { state: PageState.login, view: Login },
  { state: PageState.profile, view: Profile }
]

const resolve = state => {
  const page = pages.find(page => state.matches(page.state))

  if (!page) {
    console.error(`Could not resolve view for state ${state.value}`)
    return NotFound
  }

  return page.view
}

const Router = () => {
  const context$ = useContext(Context)
  const state = useObservable(context$, { skipDuplicates: (prev, next) => next.matches(prev.toStrings()[0]) })
  const View = resolve(state)

  console.debug(`Rendering view ${View.displayName}`)

  document.body.id = View.displayName
  return <View/>
}

export default Router
