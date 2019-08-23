import React, { useContext } from 'react'
import styled from 'styled-components'
import { Context, dispatch } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import logo from 'resources/asset/compleap-logo.png'
import LinkButton from 'component/generic/widget/LinkButton'
import Button from 'component/generic/widget/Button'
import media from 'ui/media'
import { fadeColor } from 'ui/properties'
import { UserEvent } from 'state/events'
import ProfilePopup from 'component/profile/ProfilePopup'

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
  justify-content: space-between;
`

const TopBarElementContainer = styled.div`
  display: flex;
  align-items: center;
`

const LanguageButton = styled(Button)`
  ${fadeColor};

  color: ${({ theme, active }) => active ? theme.color.white : theme.color.gray};
  text-decoration: ${({ active }) => active ? 'underline' : 'none'};
  padding: 0.5rem;

  &:not(:first-child) {
    margin: 0 1.5rem 0 0.5rem;
  }

  &:hover {
    color: ${({ theme }) => theme.color.white};
  }
`

const Divider = styled.div`
  border-right: solid 1px ${({ theme }) => theme.color.gray};
  height: 2rem;
  width: 0;
  margin: 0 0.5rem;
`

const Image = styled.img`
  height: 2rem;
  width: auto;
  margin: 1.25rem 0.5rem;

  ${media.full`
    height: 3rem;
    margin: 1.25rem 0;
  `}
`

const TopBar = () => {
  const context$ = useContext(Context)
  const currentLanguage = useObservable(context$, { path: ['context', 'user', 'language'] })
  const isLoggedIn = useObservable(context$, { path: ['context', 'user', 'isLoggedIn'] })

  return (
    <TopBarContainer>
      <TopBarContent>
        <TopBarElementContainer>
          <LinkButton href='/' type='empty'>
            <Image src={logo}/>
          </LinkButton>
        </TopBarElementContainer>
        <TopBarElementContainer>
          <LanguageButton
            type='empty'
            value={'fi'}
            active={currentLanguage === 'fi'}
            onClick={({ target }) => dispatch({ type: UserEvent.SELECT_LANGUAGE, data: { language: target.value } })}
          >
            {'FI'}
          </LanguageButton>
          <LanguageButton
            type='empty'
            value={'en'}
            active={currentLanguage === 'en'}
            onClick={({ target }) => dispatch({ type: UserEvent.SELECT_LANGUAGE, data: { language: target.value } })}
          >
            {'EN'}
          </LanguageButton>
          {isLoggedIn && (
            <React.Fragment>
              <Divider/>
              <ProfilePopup/>
            </React.Fragment>
          )}
        </TopBarElementContainer>
      </TopBarContent>
    </TopBarContainer>
  )
}

export default TopBar
