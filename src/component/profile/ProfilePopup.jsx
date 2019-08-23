import React, { useState } from 'react'
import styled from 'styled-components'
import ProfileContent from 'component/profile/fragment/ProfileContent'
import { roundedRectangle } from 'ui/properties'

const Container = styled.div`
  position: relative;
`

const ProfileButton = styled.button`

`

const Popup = styled.div`
  ${roundedRectangle};
  
  position: absolute;
  top: 2rem;
  right: 1rem;
  z-index: ${({ theme }) => theme.z.popup};
  background-color: ${({ theme }) => theme.color.white};
  box-shadow: 1px 1px 10px 1px ${({ theme }) => theme.color.gray};
`

const ProfilePopup = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Container>
      <ProfileButton onClick={() => setIsOpen(!isOpen)}>{'Profile'}</ProfileButton>
      {
        isOpen
          ? (
            <Popup>
              <ProfileContent/>
            </Popup>
          )
          : null
      }
    </Container>
  )
}

export default ProfilePopup
