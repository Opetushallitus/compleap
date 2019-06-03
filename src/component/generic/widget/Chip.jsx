import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import theme from 'ui/theme'
import { rounded } from 'ui/properties'
import Checkmark from 'resources/asset/checkmark.svg'
import { children } from 'util/proptype'

const ChipType = ['primary', 'secondary']

const ChipButton = styled.button`
  ${rounded};

  position: relative;
  display: inline-block;
  border-style: solid;
  cursor: pointer;
  font-size: ${({ theme }) => theme.font.size.base};
  padding: 0.5rem 2.95rem 0.5rem 1rem;
  margin: 0.5rem 0.25rem;
  height: 2.45rem;
  box-shadow: ${({ theme, selected }) => selected ? `0 5px 10px 2px ${theme.color.gray}` : 'unset'};
  
  &:active {
    color: ${({ theme }) => theme.color.black};
  }

  &:focus {
    outline: 0;
  }
`

const ChipButtonPrimary = styled(ChipButton)`
  text-transform: uppercase;
  background: ${({ theme }) => theme.color.white};
  border: solid 3px ${({ theme, selected }) => selected ? theme.color.accent : theme.color.grayLighter};
`

const ChipButtonSecondary = styled(ChipButton)`
  text-transform: none;
  background: ${({ theme }) => theme.color.accentLightest};
  border: solid 2px ${({ theme, selected }) => selected ? theme.color.accent : 'transparent'};
`

const ChipIconContainer = styled.div`
  position: absolute;
  border-radius: 50%;
  width: 2.45rem;
  height: 2.45rem;
  top: ${({ primary }) => primary ? '-3px' : '-2px'};
  right: ${({ primary }) => primary ? '-3px' : '-2px'};
  background-color: ${({ theme, selected }) => selected ? theme.color.accent : 'transparent'};
`

const Chip = ({ type = 'primary', selected = false, value, onClick, children }) => {
  const isPrimary = type === 'primary'
  const ChipComponent = isPrimary ? ChipButtonPrimary : ChipButtonSecondary
  return (
    <div style={{ display: 'contents' }}>
      <ChipComponent value={value} selected={selected} primary={isPrimary} onClick={onClick}>
        {children}
        <ChipIconContainer selected={selected} primary={isPrimary}>
          <Checkmark style={{
            width: '1rem',
            height: '1rem',
            marginTop: '0.7rem',
            stroke: selected ? theme.color.white : isPrimary ? theme.color.grayLighter : theme.color.grayLighter,
            strokeWidth: 2
          }}/>
        </ChipIconContainer>
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
