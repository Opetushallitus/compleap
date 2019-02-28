const MaxTitleLength = 60

const logGroupDetailFormat = 'color: #777777; font-weight: 400;'
const logGroupHighlightFormat = 'color: #444444; font-weight: 600;'

const createStamp = () => {
  const date = new Date()
  return date.toISOString()
}

const truncateString = str => str.length > MaxTitleLength ? `${str.substring(0, MaxTitleLength)}...` : str

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
  const states = state.toStrings()
  logUpdate('state', states[states.length - 1], state)
}
