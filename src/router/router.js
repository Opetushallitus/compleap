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

/**
 * Harmonize pathnames to include leading slash for all browsers.
 * (IE does not include leading slash in location object's pathname.)
 * @param pathname pathname of a Location object
 */
function ensureLeadingSlash (pathname) {
  return pathname.startsWith('/') ? pathname : `/${pathname}`
}

function createPath (location) {
  const pathname = ensureLeadingSlash(location.pathname)
  return pathname + location.hash
}

function resolve (path) {
  const match = routes[path]
  if (!match) throw new Error(`Route not found for path ${path}`)
  return match
}

function transition (event) {
  const isExternal = event.currentTarget.hostname !== window.location.hostname

  if (isExternal) {
    console.debug(`Opening external link to ${event.currentTarget.href}`)
    return
  }

  event.preventDefault()
  history.push(undefined, { path: createPath(event.currentTarget) })
}

export {
  transition
}
