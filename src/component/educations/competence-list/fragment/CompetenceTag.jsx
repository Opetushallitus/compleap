import React from 'react'
import PropTypes from 'prop-types'
import Checkmark from 'resources/asset/checkmark.svg'
import styled from 'styled-components'
import { chipButtonBase } from 'ui/properties'
import { children } from 'util/proptype'

const ChipButton = styled.button`
  ${chipButtonBase};

  border: solid 2px ${({ theme, selected }) => selected ? theme.color.accentDarker : theme.color.grayLighter};
  background-color: ${({ theme, selected }) => selected ? theme.color.accentLightest : theme.color.white};
  height: 1rem;
  line-height: 1rem;
  padding: 0.3rem 4rem 0.3rem 1rem;
  margin: 0.2rem;
  box-shadow: ${({ theme, selected }) => selected ? `0 5px 10px 3px ${theme.color.gray}` : 'unset'};

  &:hover {
    border-color: ${({ theme }) => theme.color.accentDarker};
    
    & svg:not(:hover) {
      stroke: ${({ theme }) => theme.color.gray};
    }
  }
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
  background-color: ${({ theme, selected }) => selected ? theme.color.accentDarker : 'transparent'};
  stroke: ${({ theme, selected }) => selected ? theme.color.white : theme.color.grayLighter};
  border: solid 2px ${({ theme }) => theme.color.grayLighter};
  border-radius: 50%;
  width: 1.3rem;
  height: 1.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: ${({ theme }) => theme.color.grayLighter};

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
    stroke: ${({ theme }) => theme.color.accentDarker};
  }
`

const Text = styled.div`
  text-transform: capitalize;
`

const CompetenceTag = ({ selected = false, value, onClick, children }) => {
  return (
    <div style={{ display: 'contents' }}>
      <ChipButton value={value} selected={selected} onClick={onClick}>
        <Text>
          {children}
        </Text>
        <ChipIconsContainer>
          <TooltipIconContainer>
            <span>{'i'}</span>
          </TooltipIconContainer>
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
  children
}

export default CompetenceTag
