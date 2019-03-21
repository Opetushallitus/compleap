import React from 'react'
import styled from 'styled-components'
import Education from 'component/education/Education'
import Interests from 'component/interests/Interests'
import Box from 'component/generic/widget/Box'

const SectionContainer = styled.section`
  margin-bottom: 2rem;
`

const Profile = () => (
  <React.Fragment>
    <SectionContainer>
      <Box>
        <Education/>
      </Box>
    </SectionContainer>
    <SectionContainer>
      <Box>
        <Interests/>
      </Box>
    </SectionContainer>
  </React.Fragment>
)

Profile.displayName = 'Profile'

export default Profile
