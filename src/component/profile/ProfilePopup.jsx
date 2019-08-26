import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import useClickOutside from 'component/generic/hook/useClickOutside'
import media from 'ui/media'
import { emptyButton } from 'ui/properties'
import { PopupArrow, PopupContainer } from 'component/generic/widget/Popup'
import ProfileContent from './fragment/ProfileContent'
import ProfileImage from './fragment/ProfileImage'

const ProfileButtonImageRadius = 1.5

const Container = styled.div`
  position: relative;
`

const ProfileButton = styled.button`
  ${emptyButton};
  margin: 0 0.5rem;

  ${media.full`
    margin: 0 2rem 0 1rem;
  `}
`

// eslint-disable-next-line react/display-name
const Popup = React.forwardRef((_, ref) => (
  <>
    <PopupArrow/>
    <PopupContainer ref={ref}><ProfileContent/></PopupContainer>
  </>
))

const ProfilePopup = () => {
  const [isOpen, setIsOpen] = useState(false)
  const buttonRef = useRef()
  const popupRef = useRef()
  const togglePopup = () => setIsOpen(!isOpen)
  useClickOutside(togglePopup, buttonRef, popupRef)

  return (
    <Container>
      <ProfileButton onClick={togglePopup} ref={buttonRef}>
        <ProfileImage radius={ProfileButtonImageRadius}/>
      </ProfileButton>
      {isOpen && <Popup ref={popupRef}/>}
    </Container>
  )
}

export default ProfilePopup
