import { createBrowserHistory } from 'history'
import { dispatch } from 'state/state'
import routes from 'router/routes'

const history = createBrowserHistory()

history.replace(undefined, { path: '/' })

history.listen(location => {
  const path = location.state && location.state.path

  if (!path) {
    history.replace(undefined, { path: '/' })
    return
  }

  const transition = resolve(path)
  dispatch(transition)
})

function createPath (location) {
  return location.pathname + location.hash
}

function resolve (path) {
  const match = routes[path]
  if (!match) throw new Error(`Route not found for path ${path}`)
  return match
}

function transition (event) {
  event.preventDefault()
  history.push(undefined, { path: createPath(event.currentTarget) })
}

export {
  transition
}
