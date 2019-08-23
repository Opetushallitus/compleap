import React, { useContext } from 'react'
import styled from 'styled-components'
import { Context } from 'state/state'
import ProfileIcon from 'resources/asset/profile.svg'
import useObservable from 'component/generic/hook/useObservable'

const Image = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${({ url }) => `url(${url})`};
`

const ImagePlaceholder = styled(ProfileIcon)`
  width: 100%;
  height: 100%;
  stroke: ${({ theme }) => theme.color.grayLighter};
  fill: ${({ theme }) => theme.color.grayLighter};
`

const ProfileImage = () => {
  const context$ = useContext(Context)
  const imageURL = useObservable(context$, { path: ['context', 'user', 'profileImageURL'] })
  return imageURL ? <Image url={imageURL}/> : <ImagePlaceholder/>
}

export default ProfileImage
