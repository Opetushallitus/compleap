import { useEffect } from 'react'

export default (onClickOutside, ...refs) => {
  const handleClickOutside = event => {
    const isClickOutside = refs.every(r => r.current && !r.current.contains(event.target))
    if (isClickOutside) {
      onClickOutside()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  })
}
