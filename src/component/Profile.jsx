import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Educations from 'component/educations/Educations'
import Interests from 'component/interests/Interests'
import Box from 'component/generic/widget/Box'
import theme from 'ui/theme'
import Recommendations from 'component/recommendations/Recommendations'
import useTranslation from 'component/generic/hook/useTranslation'
import { children } from 'util/proptype'

const StyledSection = styled.section`
  position: relative;
  z-index: ${({ even }) => even ? 0 : 1}
  background-color: ${({ theme, even }) => even && theme.color.white};
  margin-top: ${({ even, first }) => even && !first && '-5vw'};
}

  & > svg {
    display: block;
    width: 100%;
    height: 6vw;
  }
`

const Svg = ({ children }) => (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'>
    {children}
  </svg>
)

Svg.propTypes = {
  children
}

const SectionContainer = ({ even, first = false, last = false, children }) => {
  if (first && last) console.warn('Mismatching arguments')

  return (
    <StyledSection even={even} first={first}>
      {even && !first && <Svg><polygon fill={theme.color.background} points='0,0 100,0 0,100'/></Svg>}
      {children}
      {even && !last && <Svg><polygon fill={theme.color.background} points='0,100 100,0 100,100'/></Svg>}
    </StyledSection>
  )
}

SectionContainer.propTypes = {
  even: PropTypes.bool.isRequired,
  first: PropTypes.bool,
  last: PropTypes.bool,
  children
}

const StyledIntroductionText = styled.div`
  background-color: ${({ theme }) => theme.color.white};
`

const IntroductionText = () => {
  const t = useTranslation()
  const text = t`Tervetuloa-teksti ja ohjeistus`
  return text.length > 0 ? <StyledIntroductionText><Box>{text}</Box></StyledIntroductionText> : null
}

const Profile = () => (
  <React.Fragment>
    <IntroductionText/>
    <SectionContainer even={true} first={true}>
      <Box>
        <Educations/>
      </Box>
    </SectionContainer>
    <SectionContainer even={false}>
      <Box>
        <Interests/>
      </Box>
    </SectionContainer>
    <SectionContainer even={true} last={true}>
      <Box>
        <Recommendations/>
      </Box>
    </SectionContainer>
  </React.Fragment>
)

Profile.displayName = 'Profile'

export default Profile
