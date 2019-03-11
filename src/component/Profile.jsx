import React from 'react'
import t from 'util/translate'
import { H1 } from 'ui/typography'
import Interests from 'component/interests/Interests'

const Profile = () => (
  <div>
    <H1>
      {t`CompLeap`}
    </H1>
    <Interests/>
  </div>
)

Profile.displayName = 'Profile'

export default Profile
