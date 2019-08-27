import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Checkmark from 'resources/asset/checkmark.svg'
import { chipButtonBase } from 'ui/properties'
import { children } from 'util/proptype'
import media from 'ui/media'
import { PopupContainer } from 'component/generic/widget/Popup'
import useTranslation from 'component/generic/hook/useTranslation'

const ChipButton = styled.button`
  ${chipButtonBase};

  border: solid 2px ${({ theme, selected }) => selected ? theme.color.accentDarker : theme.color.grayLighter};
  background-color: ${({ theme, selected }) => selected ? theme.color.accentLightest : theme.color.white};
  min-height: 1rem;
  line-height: 1rem;
  padding: 0.3rem 4rem 0.3rem 1rem;
  margin: 0.2rem;
  box-shadow: ${({ theme, selected }) => selected ? `0 5px 10px 3px ${theme.color.gray}` : 'unset'};

  &:hover {
    border-color: ${({ theme }) => theme.color.accentDarker};
    
    & svg {
      stroke: ${({ theme, selected }) => selected ? theme.color.white : theme.color.gray};
    }
  }
`

const Text = styled.div`
  text-transform: capitalize;
  text-align: left;
`

const ChipIconsContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  top: 0;
  right: -2px;
  height: 100%;
  width: 4rem;
`

const TooltipIconContainer = styled.div`
  box-sizing: border-box;
  color: ${({ theme, selected }) => selected ? theme.color.gray : theme.color.grayLighter};
  border: solid 2px ${({ theme, selected }) => selected ? theme.color.gray : theme.color.grayLighter};
  border-radius: 50%;
  width: 1.3rem;
  height: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.color.accentDarker};
    border-color: ${({ theme }) => theme.color.accentDarker};
  }
`

const CheckmarkIconContainer = styled.div`
  background-color: ${({ theme, selected }) => selected ? theme.color.accentDarker : 'transparent'};
  stroke: ${({ selected, theme }) => selected ? theme.color.white : theme.color.grayLighter};
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 50%;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.2rem;

  &:hover {
    stroke: ${({ theme, selected }) => selected ? theme.color.white : theme.color.accentDarker};
  }
`

const TooltipLink = styled.a`
  position: relative;
  text-decoration: none;
  color: ${({ theme }) => theme.color.black}
`

const TooltipContainer = styled(PopupContainer)`
  top: 1.75rem;
  right: -4rem;

  ${media.full`
    top: 1.75rem;
    right: -4rem;
  `}
`

const TooltipContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 2rem;
  width: 6rem;
  padding: 0.1rem 0.25rem;
  font-size: ${({ theme }) => theme.font.size.xs};
`

const CompetenceTag = ({ selected = false, value, onClick, seeMoreUrl, children }) => {
  const t = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div style={{ display: 'contents' }}>
      <ChipButton value={value} selected={selected} onClick={onClick}>
        <Text>
          {children}
        </Text>
        <ChipIconsContainer>
          <TooltipLink
            href={seeMoreUrl}
            target='_blank'
            rel='noopener noreferrer'
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
          >
            <TooltipIconContainer selected={selected}>
              {'i'}
            </TooltipIconContainer>
            {isOpen && (
              <TooltipContainer>
                <TooltipContent>
                  {t`Katso lisätietoja osaamisesta`}
                </TooltipContent>
              </TooltipContainer>
            )}
          </TooltipLink>
          <CheckmarkIconContainer selected={selected}>
            <Checkmark style={{ strokeWidth: 2, paddingRight: '0.15rem' }}/>
          </CheckmarkIconContainer>
        </ChipIconsContainer>
      </ChipButton>
    </div>
  )
}

CompetenceTag.propTypes = {
  selected: PropTypes.bool,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  seeMoreUrl: PropTypes.string.isRequired,
  children
}

export default CompetenceTag
