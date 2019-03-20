import React from 'react'
import styled from 'styled-components'
import t from 'util/translate'
import { H1 } from 'ui/typography'
import Education from 'component/education/Education'
import Interests from 'component/interests/Interests'

const ProfileContainer = styled.main`
  max-width: ${props => props.theme.layout.maxContentWidth};
  margin: auto;
`

const SectionContainer = styled.section`
  margin-bottom: 2rem;
`

const Profile = () => (
  <ProfileContainer>
    <H1>
      {t`CompLeap`}
    </H1>
    <SectionContainer>
      <Education/>
    </SectionContainer>
    <SectionContainer>
      <Interests/>
    </SectionContainer>
  </ProfileContainer>
)

Profile.displayName = 'Profile'

export default Profile
