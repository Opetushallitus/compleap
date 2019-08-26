import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'ui/theme'
import { chipButtonBase, chipIconContainerBase } from 'ui/properties'
import Checkmark from 'resources/asset/checkmark.svg'
import { children } from 'util/proptype'

const ChipType = ['primary', 'secondary']

const ChipButtonPrimary = styled.button`
  ${chipButtonBase};

  text-transform: uppercase;
  border: solid 3px ${({ theme, selected }) => selected ? theme.color.accentDarker : theme.color.grayLighter};
  background-color: ${({ theme, selected }) => selected ? theme.color.accentLightest : theme.color.white};
  height: 1.5rem;
  line-height: 1.6rem;
  font-size: ${({ theme }) => theme.font.size.m};
  padding: 0.3rem 2.8rem 0.3rem 1rem;
  margin: 0.5rem;
  box-shadow: ${({ theme, selected }) => selected ? `0 5px 10px 3px ${theme.color.gray}` : 'unset'};

  &:hover {
    border-color: ${({ theme }) => theme.color.accentDarker};
  }
`

const ChipButtonSecondary = styled.div`
  ${chipButtonBase};

  text-transform: none;
  border-style: ${({ theme, selected }) => selected ? 'solid' : 'dashed'};
  border-width: 2px;
  border-color: ${({ theme, selected }) => selected ? theme.color.accent : theme.color.accentLighter};
  background: ${({ theme, selected }) => selected ? theme.color.accentLightest : theme.color.white};
  height: 1rem;
  line-height: 1.1rem;
  padding: 0.3rem 2rem 0.3rem 1rem;
  margin: 0.75rem 0.25rem;
  box-shadow: ${({ theme, selected }) => selected ? `0 3px 8px 1px ${theme.color.gray}` : 'unset'};

  &:hover {
    border-color: ${({ theme }) => theme.color.accent};
  }
`

const ChipIconContainerPrimary = styled.div`
  ${chipIconContainerBase};

  padding: 2px;
  top: -3px;
  right: -3px;
  background-color: ${({ theme, selected }) => selected ? theme.color.accentDarker : 'transparent'};
  stroke: ${({ selected }) => selected ? theme.color.white : theme.color.grayLighter};
  width: 2.1rem;
  height: 2.1rem;
`

const ChipIconContainerSecondary = styled.div`
  ${chipIconContainerBase};

  padding: 2px 0.2rem 2px 2px;
  top: -2px;
  right: -2px;
  stroke: ${({ selected }) => selected ? theme.color.accentDarker : theme.color.grayLighter};
  width: 1.6rem;
  height: 1.6rem;
`

const Chip = ({ type = 'primary', selected = false, value, onClick, children }) => {
  const isPrimary = type === 'primary'
  const ChipComponent = isPrimary ? ChipButtonPrimary : ChipButtonSecondary
  const ChipIconComponent = isPrimary ? ChipIconContainerPrimary : ChipIconContainerSecondary
  const CheckmarkStyle = isPrimary
    ? { height: '2.1rem', strokeWidth: 2 }
    : { height: '1rem', strokeWidth: 2 }

  return (
    <div style={{ display: 'contents' }}>
      <ChipComponent value={value} selected={selected} primary={isPrimary} onClick={onClick}>
        {children}
        <ChipIconComponent selected={selected} primary={isPrimary}>
          <Checkmark style={CheckmarkStyle}/>
        </ChipIconComponent>
      </ChipComponent>
    </div>
  )
}

Chip.propTypes = {
  type: PropTypes.oneOf(ChipType),
  selected: PropTypes.bool,
  value: PropTypes.string.isRequired,
  hasParent: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  children
}

export default Chip
