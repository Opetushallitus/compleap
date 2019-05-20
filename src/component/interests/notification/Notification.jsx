import React, { useEffect, useRef, useState } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import posed, { PoseGroup } from 'react-pose'
import { children, ref } from 'util/proptype'

const FloatingBannerContent = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  min-height: 80px;
  box-sizing: border-box;
  padding: 0.5rem;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ theme }) => theme.color.white};
  z-index: ${({ theme }) => theme.z.popup};
  box-shadow: 1px 1px 10px 1px ${({ theme }) => theme.color.gray};
`

const Portal = ({ children }) => ReactDOM.createPortal(children, document.getElementById('overlay-root'))

const Contents = posed(FloatingBannerContent)({
  enter: { bottom: 0, transition: { duration: 300 }, delayChildren: 150, staggerChildren: 100 },
  exit: { bottom: -100, transition: { duration: 300 }, delay: 150 }
})

const Notification = ({ container, offsetTop = 0, offsetBottom = 0, children }) => {
  const [show, setShow] = useState(false)

  const lastPos = useRef(0)
  const hold = useRef(false)

  useEffect(() => {
    window.addEventListener('scroll', () => {
      lastPos.current = window.scrollY + window.innerHeight

      if (!hold.current) {
        window.requestAnimationFrame(() => {
          const targetRect = container.current.getBoundingClientRect()
          const topTrigger = targetRect.y + offsetTop
          const bottomTrigger = targetRect.y + targetRect.height + offsetBottom
          setShow(window.innerHeight > topTrigger && window.innerHeight < bottomTrigger)
          hold.current = false
        })

        hold.current = true
      }
    })
  })

  return (
    <Portal>
      <PoseGroup flipMove={false}>
        {show && (
          <Contents key='contents'>
            {children}
          </Contents>
        )}
      </PoseGroup>
    </Portal>
  )
}

Notification.propTypes = {
  container: ref.isRequired,
  offsetTop: PropTypes.number,
  offsetBottom: PropTypes.number,
  children
}

export default Notification
