import React from 'react'
import styled from 'styled-components'
import Education from 'component/education/Education'
import Interests from 'component/interests/Interests'

const ProfileContainer = styled.div`
  max-width: ${props => props.theme.layout.maxContentWidth};
  margin: auto;
`

const SectionContainer = styled.section`
  margin-bottom: 2rem;
`

const Profile = () => (
  <ProfileContainer>
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
