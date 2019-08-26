import React from 'react'
import PropTypes from 'prop-types'
import Checkmark from 'resources/asset/checkmark.svg'
import styled from 'styled-components'
import { chipButtonBase, chipIconContainerBase } from 'ui/properties'
import theme from 'ui/theme'
import { children } from 'util/proptype'

const ChipButton = styled.button`
  ${chipButtonBase};

  text-transform: capitalize;
  border: solid 2px ${({ theme, selected }) => selected ? theme.color.accentDarker : theme.color.grayLighter};
  background-color: ${({ theme, selected }) => selected ? theme.color.accentLightest : theme.color.white};
  height: 1rem;
  line-height: 1rem;
  padding: 0.3rem 2.8rem 0.3rem 1rem;
  margin: 0.2rem;
  box-shadow: ${({ theme, selected }) => selected ? `0 5px 10px 3px ${theme.color.gray}` : 'unset'};

  &:hover {
    border-color: ${({ theme }) => theme.color.accentDarker};
  }
`

const ChipIconContainer = styled.div`
  ${chipIconContainerBase};

  width: 1.6rem;
  height: 1.6rem;
  padding: 2px;
  top: -2px;
  right: -2px;
  background-color: ${({ theme, selected }) => selected ? theme.color.accentDarker : 'transparent'};
  stroke: ${({ selected }) => selected ? theme.color.white : theme.color.grayLighter};
`

const CompetenceTag = ({ selected = false, value, onClick, children }) => {
  return (
    <div style={{ display: 'contents' }}>
      <ChipButton value={value} selected={selected} onClick={onClick}>
        {children}
        <ChipIconContainer selected={selected}>
          <Checkmark style={{ strokeWidth: 2, paddingRight: '0.15rem' }}/>
        </ChipIconContainer>
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
