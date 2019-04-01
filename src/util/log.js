const MaxTitleLength = 100

const logGroupDetailFormat = 'color: #777777; font-weight: 400;'
const logGroupHighlightFormat = 'color: #999999; font-weight: 600;'

const createStamp = () => {
  const date = new Date()
  return date.toISOString()
}

const truncateString = str => str.length > MaxTitleLength ? `${str.substring(0, MaxTitleLength)}...` : str

const stateHasError = state => state.event.type === 'error.execution'

const logUpdate = (category, title, data) => {
  const stamp = createStamp()

  console.groupCollapsed(
    '%c%s %c%s %c%s',
    logGroupDetailFormat, category,
    logGroupHighlightFormat, truncateString(title),
    logGroupDetailFormat, stamp
  )

  console.debug('title:', data)
  console.debug('time:', stamp)
  console.groupEnd()
}

export const logEvent = event => {
  const eventType = typeof event === 'string' ? event : event.type
  logUpdate('event', eventType, event)
}

export const logState = state => {
  if (stateHasError(state)) console.error('A service has failed. Resulting state may contain an error. Check state for details.')

  const states = state.toStrings()
  logUpdate('state', states.reverse().join(', '), state)
}
