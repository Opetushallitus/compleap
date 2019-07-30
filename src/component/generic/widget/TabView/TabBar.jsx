import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import useTranslation from 'component/generic/hook/useTranslation'

const BorderWidth = '1px'
const BorderColor = ({ theme }) => theme.color.grayDarker
const TabColor = ({ theme }) => theme.color.white

const Bar = styled.div`
  margin: 1rem 0;
  display: flex;
  border-bottom: solid 1px ${({ theme }) => theme.color.grayDarker};
`

const TabSpacerContainer = styled.div`
  margin: 0 1rem;
  flex-grow: 2;
`

const TabContainer = styled.div`
  border-left: solid ${BorderWidth} ${({ active }) => active ? BorderColor : 'transparent'};
  border-right: solid ${BorderWidth} ${({ active }) => active ? BorderColor : 'transparent'};
`

const Tab = styled.div`
  padding: 1rem;
  border-top: solid ${BorderWidth} ${BorderColor};
  border-bottom: solid ${BorderWidth} ${BorderColor};
  margin-bottom: -${BorderWidth};
`

const ActiveTab = styled(Tab)`
  cursor: default;
  border-bottom: solid ${BorderWidth} ${TabColor};
`

const InactiveTab = styled(Tab)`
  cursor: pointer;
  border-color: transparent;
`

const TabBar = ({ titles, activeTab, onTabClick }) => {
  const t = useTranslation()

  return (
    <Bar>
      {titles.map(title => (
        <TabSpacerContainer key={title}>
          {
            title === activeTab
              ? (
                <TabContainer active={true}>
                  <ActiveTab>
                    {t(title)}
                  </ActiveTab>
                </TabContainer>
              )
              : (
                <TabContainer>
                  <InactiveTab onClick={() => onTabClick(title)}>
                    {t(title)}
                  </InactiveTab>
                </TabContainer>
              )
          }
        </TabSpacerContainer>
      ))}
    </Bar>
  )
}

TabBar.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabClick: PropTypes.func.isRequired
}

export default TabBar
