import React from 'react'
import styled from 'styled-components'
import logo from 'resources/asset/compleap-logo.png'
import LinkButton from 'component/generic/widget/LinkButton'

const TopBarContainer = styled.div`
  background-color: ${({ theme }) => theme.color.black};
  width: 100%;
  height: 5.5rem;
`

const TopBarContent = styled.nav`
  max-width: ${({ theme }) => theme.layout.maxContentWidth};
  margin: auto;
  height: 5.5rem;
  display: flex;
`

const Image = styled.img`
  height: 3rem;
  width: auto;
  margin: 1.25rem 0;
`

const TopBar = () => (
  <TopBarContainer>
    <TopBarContent>
      <LinkButton href='/' type='empty'>
        <Image src={logo}/>
      </LinkButton>
    </TopBarContent>
  </TopBarContainer>
)

export default TopBar
