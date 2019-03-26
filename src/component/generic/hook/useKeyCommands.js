import { useEffect } from 'react'

export default ({ onEscape, onEnter, onDown, onUp }) => useEffect(() => {
  const handler = event => {
    const key = event.key || event.keyCode

    switch (key) {
      case 'Escape':
      case 'Esc':
      case 27:
        return onEscape()
      case 'Enter':
        return onEnter()
      case 'ArrowDown':
        return onDown()
      case 'ArrowUp':
        return onUp()
    }
  }

  document.addEventListener('keydown', handler)
  return () => document.removeEventListener('keydown', handler)
})
