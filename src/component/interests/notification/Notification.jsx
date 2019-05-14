import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { children } from 'util/proptype'

const FloatingBannerContent = styled.div`
  position: fixed;
  bottom: 0;
  height: 3rem;
  width: 100%;
  background-color: ${({ theme }) => theme.color.white};
  z-index: ${({ theme }) => theme.z.popup};
`

const Portal = ({ children }) => ReactDOM.createPortal(children, document.getElementById('overlay-root'))

const Notification = ({ box, offset = 0, children }) => {
  const [show, setShow] = useState(false)

  const lastPos = useRef(0)
  const hold = useRef(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      lastPos.current = window.scrollY + window.innerHeight

      if (!hold.current) {
        window.requestAnimationFrame(() => {
          const targetRect = box.current.getBoundingClientRect()
          setShow(window.innerHeight > targetRect.y + offset)
          hold.current = false
        })

        hold.current = true
      }
    })
  })

  return show && (
    <Portal>
      <FloatingBannerContent>
        {children}
      </FloatingBannerContent>
    </Portal>
  )
}

Notification.propTypes = {
  box: PropTypes.node.isRequired,
  offset: PropTypes.number,
  children
}

export default Notification
