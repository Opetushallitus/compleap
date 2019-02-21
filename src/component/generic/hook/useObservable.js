import { useEffect, useState } from 'react'

export default (observable, path) => {
  const lensed = path ? observable.view(path) : observable
  const [v, setV] = useState(lensed.get())
  useEffect(() => lensed.changes().forEach(setV), lensed)

  return v
}
