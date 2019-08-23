import React, { useContext, useRef } from 'react'
import styled from 'styled-components'
import { math } from 'polished'
import { Context, dispatch } from 'state/state'
import { UserEvent } from 'state/events'
import ProfileIcon from 'resources/asset/profile.svg'
import useObservable from 'component/generic/hook/useObservable'
import { emptyButton } from 'ui/properties'

const Radius = '30px'
const Diameter = math(`${Radius} * 2`)

const ImagePlaceholder = styled(ProfileIcon)`
  width: 100%;
  height: 100%;
  stroke: ${({ theme }) => theme.color.grayLighter};
  fill: ${({ theme }) => theme.color.grayLighter};
`

const Image = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${({ url }) => `url(${url})`};
`

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
  background-color: ${({ theme }) => theme.color.secondary};
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

const ProfileImage = () => {
  const changeButtonRef = useRef()
  const context$ = useContext(Context)
  const imageURL = useObservable(context$, { path: ['context', 'user', 'profileImageURL'] })

  return (
    <div>
      <ChangeImageButton onClick={() => changeButtonRef.current.click()}>
        {
          imageURL
            ? <Image url={imageURL}/>
            : <ImagePlaceholder/>
        }
        <ChangeImageTextContainer>
          <ChangeImageText>
            {'Vaihda kuva'}
          </ChangeImageText>
        </ChangeImageTextContainer>
      </ChangeImageButton>
      <FilePickerInput type='file' ref={changeButtonRef} onChange={changeImage}/>
    </div>
  )
}

export default ProfileImage
