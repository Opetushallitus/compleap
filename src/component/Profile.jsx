import React from 'react'
import styled from 'styled-components'
import t from 'util/translate'
import { H1 } from 'ui/typography'
import Interests from 'component/interests/Interests'

const ProfileContainer = styled.main`
  max-width: ${props => props.theme.layout.maxContentWidth};
  margin: auto;
`

const Profile = () => (
  <ProfileContainer>
    <H1>
      {t`CompLeap`}
    </H1>
    <Interests/>
  </ProfileContainer>
)

Profile.displayName = 'Profile'

export default Profile
