import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Context } from 'state/state'
import ProfileIcon from 'resources/asset/profile.svg'
import useObservable from 'component/generic/hook/useObservable'
import { math } from 'polished'

const ImageContainer = styled.div.attrs(props => ({
  radius: `${props.radius}rem`,
  diameter: `${math(`${props.radius} * 2`)}rem`
}))`
  width: ${({ diameter }) => diameter};
  height: ${({ diameter }) => diameter};
  clip-path: ${({ radius }) => `circle(${radius} at center)`};
`

const Image = styled.div`
  width: 100%;
  height: 100%;
  background-image: ${({ url }) => `url(${url})`};
  background-position: 50% 50%;
`

const ImagePlaceholder = styled(ProfileIcon)`
  width: 100%;
  height: 100%;
  stroke: ${({ theme }) => theme.color.grayLighter};
  fill: ${({ theme }) => theme.color.grayLighter};
`

const ProfileImage = ({ radius = 2, children }) => {
  const context$ = useContext(Context)
  const imageURL = useObservable(context$, { path: ['context', 'user', 'profileImageURL'] })
  return (
    <ImageContainer radius={radius}>
      {imageURL ? <Image url={imageURL}/> : <ImagePlaceholder/>}
      {children}
    </ImageContainer>
  )
}

ProfileImage.propTypes = {
  radius: PropTypes.number,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
}

export default ProfileImage
