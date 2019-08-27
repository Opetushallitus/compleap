import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Context } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
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

const IntroductionSection = styled.div`
  background-color: ${({ theme }) => theme.color.white};
`

const IntroductionContentContainer = styled(Box)`
  padding-bottom: 0;
`

const IntroductionHeading = styled.b`
  font-size: ${({ theme }) => theme.font.size.l};
`

const IntroductionText = () => {
  const t = useTranslation()
  const context$ = useContext(Context)
  const name = useObservable(context$, { path: ['context', 'user', 'name'] })

  return (
    <IntroductionSection>
      <IntroductionContentContainer>
        <IntroductionHeading>
          {t`Tervetuloa` + ' ' + name + '!'}
        </IntroductionHeading>
        <p>
          {t`Tämän palvelun avulla saat tietoa sinulle sopivista koulutusmahdollisuuksista aikaisemman koulutuksesi sekä sinua työelämässä kiinnostavien asioiden perusteella. Koulutusmahdollisuudet ovat suuntaa antavia.`}
        </p>
      </IntroductionContentContainer>
    </IntroductionSection>
  )
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
