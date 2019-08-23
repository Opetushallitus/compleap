import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import useClickOutside from 'component/generic/hook/useClickOutside'
import ProfileContent from 'component/profile/fragment/ProfileContent'
import media from 'ui/media'
import { emptyButton, roundedRectangle } from 'ui/properties'
import ProfileImage from 'component/profile/fragment/ProfileImage'
import UpArrow from 'component/profile/fragment/UpArrow'
import { transparentize } from 'polished'

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

const PopupArrow = styled(UpArrow)`
  top: 3.25rem;
  right: 1.25rem;

  ${media.full`
    right: 2.75rem;
  `}
`

const Popup = styled.div`
  ${roundedRectangle};

  position: absolute;
  top: 4rem;
  right: 0.5rem;
  z-index: ${({ theme }) => theme.z.popup};
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 1px 1px 10px 1px ${({ theme }) => transparentize(0.7, theme.color.black)};

  ${media.full`
    right: 1rem;
  `}
`

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
      {isOpen
        ? (
          <>
            <PopupArrow/>
            <Popup ref={popupRef}><ProfileContent/></Popup>
          </>
        )
        : null
      }
    </Container>
  )
}

export default ProfilePopup
