import React, { useRef } from 'react'
import styled from 'styled-components'
import { math, transparentize } from 'polished'
import { dispatch } from 'state/state'
import { UserEvent } from 'state/events'
import useTranslation from 'component/generic/hook/useTranslation'
import { emptyButton } from 'ui/properties'
import ProfileImage from 'component/profile/fragment/ProfileImage'

const Radius = '30px'
const Diameter = math(`${Radius} * 2`)

const ChangeImageButton = styled.button`
  ${emptyButton};

  position: relative;
  width: ${Diameter};
  height: ${Diameter};
  clip-path: circle(${Radius} at center);
`

const ChangeImageTextContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  color: ${({ theme }) => theme.color.white}
  background-color: ${({ theme }) => transparentize(0.2, theme.color.secondary)};
`

const ChangeImageText = styled.div`
  width: 3rem;
  margin: auto;
  line-height: 1.1em;
  padding: 0.1rem 0;
  font-size: 0.6rem;
`

const FilePickerInput = styled.input`
  display: none
`

const changeImage = changeEvent => {
  const file = changeEvent.target.files[0]
  const url = URL.createObjectURL(file)
  dispatch({ type: UserEvent.SET_IMAGE, data: { url } })
}

const ChangeableProfileImage = () => {
  const t = useTranslation()
  const changeButtonRef = useRef()

  return (
    <div>
      <ChangeImageButton onClick={() => changeButtonRef.current.click()}>
        <ProfileImage/>
        <ChangeImageTextContainer>
          <ChangeImageText>
            {t`Vaihda kuva`}
          </ChangeImageText>
        </ChangeImageTextContainer>
      </ChangeImageButton>
      <FilePickerInput type='file' ref={changeButtonRef} onChange={changeImage}/>
    </div>
  )
}

export default ChangeableProfileImage
