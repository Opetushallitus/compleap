import React, { useContext } from 'react'
import styled from 'styled-components'
import { Context, dispatch } from 'state/state'
import useObservable from 'component/generic/hook/useObservable'
import t from 'util/translate'
import logo from 'resources/asset/compleap-logo.png'
import LinkButton from 'component/generic/widget/LinkButton'
import Button from 'component/generic/widget/Button'
import { padded, roundedRectangle } from 'ui/properties'
import { UserEvent } from 'state/events'
import { PageState } from 'state/machine'

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

const Image = styled.img`
  height: 3rem;
  width: auto;
  margin: 1.25rem 0;
`

const LogoutButton = styled(Button)`
  ${roundedRectangle};
  ${padded};

  color: ${({ theme }) => theme.color.white};

  &:hover:enabled {
    color: ${({ theme }) => theme.color.grayLighter};
    background-color: ${({ theme }) => theme.color.secondary};
  }

  &:disabled {
    color: ${({ theme }) => theme.color.disabled};
    background: none;
  }
`

const TopBar = () => {
  const context$ = useContext(Context)
  const isLoggedIn = useObservable(context$, { path: ['context', 'user', 'isLoggedIn'] })
  const isLoggingOut = useObservable(context$, { path: ['value'] }) === PageState.logout

  return (
    <TopBarContainer>
      <TopBarContent>
        <TopBarElementContainer>
          <LinkButton href='/' type='empty'>
            <Image src={logo}/>
          </LinkButton>
        </TopBarElementContainer>
        {
          isLoggedIn &&
          <TopBarElementContainer>
            <LogoutButton
              type='empty'
              onClick={() => dispatch(UserEvent.LOGOUT)}
              disabled={isLoggingOut}
            >
              {t`Kirjaudu ulos`}
            </LogoutButton>
          </TopBarElementContainer>
        }
      </TopBarContent>
    </TopBarContainer>
  )
}

export default TopBar
