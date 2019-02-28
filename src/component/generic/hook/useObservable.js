import { useEffect, useState } from 'react'

export default (observable, { path = undefined, skipDuplicates = false }) => {
  const lensed = path ? observable.view(path) : observable
  const [v, setV] = useState(lensed.get())

  const eqCheck = (() => {
    switch (typeof skipDuplicates) {
      case 'boolean': return skipDuplicates ? function (a, b) { return a === b } : function () { return false }
      case 'function': return skipDuplicates
    }

    throw new Error('Invalid option argument type.')
  })()

  useEffect(
    () => lensed
      .changes()
      .skipDuplicates(eqCheck)
      .onValue(setV),
    []
  )

  return v
}
